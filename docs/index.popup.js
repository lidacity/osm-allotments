function GetClipboardText(Properties, Keys)
{
 var Result = [];
 for (const [Key, Value] of Object.entries(Properties))
  if (Keys.includes(Key))
   Result.push(`${Key}=${Value}`)
 return Result 
}


function Clipboard(Text)
{
 Text = decodeURIComponent(Text);
 Text = Text.replaceAll("\\n", "\n");
 navigator.clipboard.writeText(Text);
}


function Unpack3NF(ID, Name)
{
 return Data3NF[Name][ID]
}


function Unpack3NFsub(IDs, Name, Join)
{
 Result = new Array();
 for (Index in IDs)
 {
  ID = IDs[Index];
  Value = Data3NF[Name][ID];
  Result.push(Value);
 }
 return Result.join(Join)
}


function Popup(Feature, Layer)
{
 var Properties = Feature.properties;
 var Result = '';
 var Tag = "";
 //
 var Content = new Array();
 if (Tag = Properties['name'])
  Content.push(`<h3>${Tag}</h3>`);
 if (Tag = Properties['name'])
  Content.push(`<div class="popup-field"><strong>name</strong>: ${Tag}</div>`);
 if (Tag = Properties['name:be'])
  Content.push(`<div class="popup-field"><strong>name:be</strong>: ${Tag}</div>`);
 if (Tag = Properties['name:ru'])
  Content.push(`<div class="popup-field"><strong>name:ru</strong>: ${Tag}</div>`);
 if (Content.length > 0)
  Result += `
   <div class="popup-content">
    ${Content.join('\n ')}
   </div>
   <hr />`;
 //
 Content = new Array();
 if (Tag = Properties['official_name'])
  Content.push(`<div class="popup-field"><strong>official_name</strong>: ${Tag}</div>`);
 if (Tag = Properties['official_name:be'])
  Content.push(`<div class="popup-field"><strong>official_name:be</strong>: ${Tag}</div>`);
 if (Tag = Properties['official_name:ru'])
  Content.push(`<div class="popup-field"><strong>official_name:ru</strong>: ${Tag}</div>`);
 if (Content.length > 0)
  Result += `
   <div class="popup-content">
    ${Content.join('\n ')}
   </div>
   <hr />`;
 //
 Content = new Array();
 if (Tag = Properties['official_status'])
  Content.push(`<div class="popup-field"><strong>official_status</strong>: ${Tag}</div>`);
 if (Tag = Properties['official_status:be'])
  Content.push(`<div class="popup-field"><strong>official_status:be</strong>: ${Tag}</div>`);
 if (Tag = Properties['official_status:ru'])
  Content.push(`<div class="popup-field"><strong>official_status:ru</strong>: ${Tag}</div>`);
 if (Content.length > 0)
  Result += `
   <div class="popup-content">
    ${Content.join('\n ')}
   </div>
   <hr />`;
 //
 Content = new Array();
 if (Tag = Properties['short_name'])
  Content.push(`<div class="popup-field"><strong>short_name</strong>: ${Tag}</div>`);
 if (Tag = Properties['short_name:be'])
  Content.push(`<div class="popup-field"><strong>short_name:be</strong>: ${Tag}</div>`);
 if (Tag = Properties['short_name:ru'])
  Content.push(`<div class="popup-field"><strong>short_name:ru</strong>: ${Tag}</div>`);
 if (Content.length > 0)
  Result += `
   <div class="popup-content">
    ${Content.join('\n ')}
   </div>
   <hr />`;
 //
 Content = new Array();
 if (Tag = Properties['place'])
  Content.push(`<div class="popup-field"><strong>place</strong>: ${Tag}</div>`);
 if (Tag = Properties['start_date'])
  Content.push(`<div class="popup-field"><strong>start_date</strong>: ${Tag}</div>`);
 if (Tag = Properties['plots'])
  Content.push(`<div class="popup-field"><strong>plots</strong>: ${Tag}</div>`);
 if (Tag = Properties['ref:vatin'])
  Content.push(`<div class="popup-field"><strong>УНП</strong>: <a target="_blank" href="https://etalonline.by/egr-status/${Tag}/">${Tag}</a></div>`);
 if (Content.length > 0)
  Result += `
   <div class="popup-content">
    ${Content.join('\n ')}
   </div>
   <hr />`;
 //
 Content = new Array();
 var Lat = Feature.geometry.coordinates[1];
 var Lon = Feature.geometry.coordinates[0];
 var FullID = Feature.id;
 var ShortType = Array.from(FullID)[0];
 var ID = FullID.substring(1);
 var Type = '';
 if (ShortType == 'n')
  Type = 'node';
 if (ShortType == 'w')
  Type = 'way';
 if (ShortType == 'r')
  Type = 'relation';
 Content.push(`<a target="_blank" href="https://openstreetmap.org/${Type}/${ID}">osm</a>`);
 Content.push(`<a target="_josm" href="http://localhost:8111/load_object?objects=${FullID}&relation_members=true&referrers=true" onclick='return LoadObject("${FullID}");'>josm</a>`);
 Content.push(`<a target="_id" href="https://www.openstreetmap.org/edit?${ShortType}=${ID}#map=19/${Lat}/${Lon}");'>iD</a>`);
 Content.push(`<a target="_blank" href="https://pewu.github.io/osm-history/#/${Type}/${ID}">history</a>`);
 Content.push(`<a target="_blank" href="https://mapillary.com/app/?lat=${Lat}&lng=${Lon}&z=18">Mapillary</a>`);
 if (Content.length > 0)
  Result += `
   <div class="popup-content">
    <div class="popup-field">${Content.join('&nbsp;&nbsp;')}</div>
   </div>`;
 //
 Layer.bindPopup(Result, {minWidth: 250});
}


var DateLegend =
{
 Update: "Дата обновления",
};
