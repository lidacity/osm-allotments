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


function GetContent(Name, Properties)
{
 var Result = new Array();
 if (`${Name}:be` in Properties || `${Name}:ru` in Properties)
 {
  if (Tag = Properties[`${Name}`] && Properties[`${Name}`] != Properties[`${Name}:be`])
   Result.push(`<div class="popup-field-error"><strong>${Name}</strong>: ${Tag}</div>`);
  else
   Result.push(`<div class="popup-field"><strong>${Name}</strong>:</div>`);
  //
  if (Tag = Properties[`${Name}:be`])
   Result.push(`<div class="popup-field">&nbsp;<strong>be</strong>: ${Tag}</div>`);
  if (Tag = Properties[`${Name}:ru`])
   Result.push(`<div class="popup-field">&nbsp;<strong>ru</strong>: ${Tag}</div>`);
 }
 if (Result.length > 0)
  return `
    <div class="popup-content">
     ${Result.join('\n ')}
    </div>
    <hr />`
 else
  return ``
}


function Popup(Feature, Layer)
{
 var Properties = Feature.properties;
 var Result = '';
 var Tag = "";
 //
 if (Tag = Properties['name'])
  Result += `
   <div class="popup-content">
    <h1>${Tag}</h1>
   </div>`;
 Result += GetContent('name', Properties)
 Result += GetContent('official_name', Properties)
 Result += GetContent('official_status', Properties)
 Result += GetContent('short_name', Properties)
 //
 Content = new Array();
 if (Tag = Properties['place'])
  Content.push(`<div class="popup-field"><strong>place</strong>: ${Tag}</div>`);
 if (Tag = Properties['start_date'])
  Content.push(`<div class="popup-field"><strong>start_date</strong>: ${Tag}</div>`);
 if (Tag = Properties['plots'])
  Content.push(`<div class="popup-field"><strong>plots</strong>: ${Tag}</div>`);
 if (Tag = Properties['ref:vatin'])
  Content.push(`<div class="popup-field"><strong>УНП</strong>: <a target="_blank" href="https://etalonline.by/egr-status/${Tag.slice(2)}/">${Tag}</a></div>`);
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
