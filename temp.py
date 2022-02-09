from bs4 import BeautifulSoup
import requests
from tqdm import tqdm
import re, json, xmljson
from lxml.etree import fromstring, tostring

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

for link in links:
    svg = requests.get(link[0])
    svg_content = fromstring(svg.content)
    svg_json = json.dumps(xmljson.badgerfish.data(svg_content))
    json.dump(svg_json, link[1]+'.json')
    
    
    



