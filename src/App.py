#!.venv/bin/python

import os
import sys
from datetime import datetime

import geojson
from loguru import logger

from Settings import LOG, DOCS, TEMP
from Utils import GetOverpass, SetDate, SaveGeoJson, SaveJson, LoadJson, GetID, PrepareElements
from Git import GitPush


def GetTags(Tag):
    Class = ['name', 'name:be', 'name:ru', 'official_name', 'official_name:be', 'official_name:ru', 'official_status', 'official_status:be', 'official_status:ru', 'short_name', 'short_name:be', 'short_name:ru', 'place', 'start_date', 'plots', 'ref:vatin', ]
    return {Item: Tag[Item] for Item in Class if Item in Tag}


def CheckTag(Tag):
    Class = ['name', 'name:be', 'name:ru', 'official_name', 'official_name:be', 'official_name:ru', 'official_status', 'official_status:be', 'official_status:ru', 'short_name', 'short_name:be', 'short_name:ru', ]
    for Item in Class:
        if Item not in Tag:
            return False
    return True


def CheckBe(Tag):
    Class = ['name', 'official_name', 'official_status', 'short_name', ]
    for Item in Class:
        if Tag[f'{Item}'] != Tag[f'{Item}:be']:
            return False
    return True


def CheckName(TagValue, Name):
    return TagValue[:len(Name)] == Name


def GetStatus(Tag):
    if Tag.get('landuse') == "allotments" and CheckTag(Tag) and CheckBe(Tag):
        NameBe = Tag['name:be']
        NameRu = Tag['name:ru']
        if (CheckName(Tag['official_name:be'], f"Садаводчае таварыства \"{NameBe}\"") and
            CheckName(Tag['official_name:ru'], f"Садоводческое товарищество \"{NameRu}\"") and
            CheckName(Tag['official_status:be'], "садаводчае таварыства") and
            CheckName(Tag['official_status:ru'], "садоводческое товарищество") and
            CheckName(Tag['short_name:be'], f"СТ \"{NameBe}\"") and
            CheckName(Tag['short_name:ru'], f"СТ \"{NameRu}\"")):
            if (Tag.get('place', "") == "allotments" and
                'start_date' in Tag and
                'plots' in Tag and
                'ref:vatin' in Tag):
                return "green"
            else:
                return "blue"
        else:
            return "red"
    else:
        return "black"


def GetProperties(Tags):
    Result = GetTags(Tags)
    Result['status'] = GetStatus(Tags)
    return Result


#https://wiki.openstreetmap.org/wiki/Overpass_API
#API = "http://overpass-api.de/api/interpreter"
#API = "https://maps.mail.ru/osm/tools/overpass/api/interpreter"
API = "https://overpass.private.coffee/api/interpreter"

def Generate():
    logger.info("read overpass")
    Allotments = GetOverpass("[out:json];area[name='Беларусь'];nwr[landuse=allotments](area);out center;", URL=API)
    #Allotments = LoadJson(f"{TEMP}/overpass2.json")
    SaveJson(f"{TEMP}/overpass.json", Allotments)
    Allotments = PrepareElements(Allotments)
    #
    logger.info("parse overpass")
    Features = []
    for Element in Allotments['elements']:
        ID = GetID(Element)
        Lon, Lat = Element['lon'], Element['lat']
        Geometry = geojson.Point((Lon, Lat))
        Properties = GetProperties(Element['tags'])
        Feature = geojson.Feature(id=ID, geometry=Geometry, properties=Properties)
        Features.append(Feature)
    logger.info("обработано всего {count} записей", count=len(Features))
    #
    logger.info("write json")
    FeatureCollection = geojson.FeatureCollection(Features)
    SaveGeoJson(f"{TEMP}/allotments.json", FeatureCollection)
    SaveGeoJson(f"{DOCS}/allotments.data.js", FeatureCollection, Const="Data")
    #python ./Git.py
    logger.info("git push")
    DateTime = datetime.now().strftime('%Y-%m-%d')
    Diff = GitPush(f"autogenerate {DateTime}")
    if Diff:
        logger.debug("git push complete")
        #logger.debug(Diff)
    else:
        logger.error("Git error")
 


if __name__ == "__main__":
    sys.stdin.reconfigure(encoding="utf-8")
    sys.stdout.reconfigure(encoding="utf-8")
    #
    logger.add(LOG)
    logger.info("Start")
    Generate()
    DateTime = datetime.now().strftime("%Y-%m-%dT%H:%M:00Z")
    SetDate(f"{DOCS}/allotments.date.js", 'Update', DateTime)
    logger.info("Done")
