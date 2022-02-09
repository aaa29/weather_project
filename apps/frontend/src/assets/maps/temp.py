from bs4 import BeautifulSoup
import requests
from tqdm import tqdm
import re, json, xmljson
from lxml.etree import fromstring, tostring
from collections import defaultdict

main_page = requests.get("https://simplemaps.com/resources/svg-maps")


main = BeautifulSoup(main_page.content, 'html.parser')

maps = main.find_all('ul')[3].find_all('a', href=True)

maps = ['https://simplemaps.com/resources/'+a['href'] for a in maps]


maps_links = []
for c in tqdm(maps):
    c_page = requests.get(c)
    c = BeautifulSoup(c_page.content, 'html.parser')
    h2 = c.find('h2').get_text()
    h2 = re.sub('Free ','', h2)
    h2 = re.sub(' SVG.*', '', h2)
    a = c.find('a', {"id" : "download_svg"})
    maps_links += [(a, h2)]
    
    
links = [('https://simplemaps.com/'+a[0]['href'], a[1]) for a in maps_links]

jsons = []



for link in tqdm(links):
    svg = requests.get(link[0])
    svg_content = fromstring(svg.content)
    svg_json = json.dumps(xmljson.badgerfish.data(svg_content))
    
    jsons += [{
            'country' : link[1],
            'map' : json.loads(svg_json)
        }]
    
    with open(link[1]+'.json', 'w', encoding="utf8") as f:
        json.dump(xmljson.badgerfish.data(svg_content), f)
    
    
    
world = defaultdict(list)
i = 0
for c in tqdm(jsons):
    viewbox = list(c['map'].values())[0]["@viewbox"]
    height = list(c['map'].values())[0]["@height"]
    width = list(c['map'].values())[0]["@width"]
    
    try:
        j= list(c['map'].values())[0]["{http://www.w3.org/2000/svg}path"]
    except:
        j= list(c['map'].values())[0]['{http://www.w3.org/2000/svg}g'][0]['{http://www.w3.org/2000/svg}path']


    if c['country'] == 'None': 
        name = 'unk'+str(i)
        i += 1
    else :
        name = c['country']
    world[name] = {
            'height' : height,
            'width' : width,
            'viewbox' : viewbox,
            'path' : j,
        }
    


with open("world2.json", 'w', encoding='utf8') as f:
    json.dump(world, f)