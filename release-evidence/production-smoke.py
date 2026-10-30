from playwright.sync_api import sync_playwright
import json
results=[]
def check(name, fn):
 try: fn(); results.append({'test':name,'result':'PASS'})
 except Exception as e: results.append({'test':name,'result':'FAIL','detail':str(e)[:900]})
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 page=b.new_page(); errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 def visit(path):
  res=page.goto('http://127.0.0.1:5181'+path);page.wait_for_timeout(150)
  assert res.status==200
  assert page.locator('body').inner_text().strip()
 for route in ['/','/delhi','/journey','/status','/state-selection','/original','/services/driving-licence','/services/licence-renewal','/services/unknown','/missing']:
  check('route '+route,lambda route=route:visit(route))
 def states():
  visit('/');page.get_by_role('button',name='Explore available services').click(); assert page.get_by_role('alert').count()
  picker=page.get_by_role('combobox');picker.fill('zzzz'); assert page.get_by_text('No state or Union Territory matches').is_visible()
  picker.fill('Delhi');picker.press('Enter');assert 'Delhi' in picker.input_value()
  page.get_by_role('button',name='Clear selected state').click();assert picker.input_value()==''
  picker.fill('Maharashtra');picker.press('ArrowDown');picker.press('Enter')
  page.get_by_role('button',name='Explore available services').click();page.wait_for_url('**/delhi')
  assert 'Delhi' in page.locator('h1').inner_text()
 check('state empty/no results/Enter/clear/arrows/non-Delhi routing',states)
 def menu():
  page.set_viewport_size({'width':375,'height':900});visit('/')
  toggle=page.get_by_role('button',name='Open menu');toggle.click();page.keyboard.press('Escape');assert toggle.get_attribute('aria-expanded')=='false';assert toggle.evaluate('(el)=>el===document.activeElement')
  toggle.click();page.locator('#so-navigation').get_by_role('link',name='Application Status',exact=True).click();page.wait_for_url('**/status');assert page.get_by_role('button',name='Open menu').is_visible()
 check('mobile menu Escape focus and navigation close',menu)
 page.set_viewport_size({'width':1440,'height':1000})
 def journey():
  page.evaluate('localStorage.clear()');visit('/journey')
  cont=page.get_by_role('button',name='Continue',exact=True)
  cont.click();cont.click();cont.click();assert page.get_by_text('Cannot continue yet').is_visible()
  for box in page.get_by_role('checkbox').all():box.check()
  cont.click();cont.click();assert page.get_by_text('Cannot continue yet').is_visible()
  page.locator('#so-vehicle').select_option(index=1);page.locator('#so-age').select_option(index=1);page.get_by_role('checkbox').check();cont.click()
  assert 'Step 5' in page.locator('.so-step-content h2').inner_text()
  page.reload();assert 'Step 5' in page.locator('.so-step-content h2').inner_text()
  page.get_by_role('button',name='Previous',exact=True).click();assert 'Step 4' in page.locator('.so-step-content h2').inner_text()
  cont.click();cont.click();assert 'Step 6' in page.locator('.so-step-content h2').inner_text()
  page.get_by_role('button',name='Start a new journey').click();page.wait_for_url('http://127.0.0.1:5181/')
  visit('/journey');assert 'Step 1' in page.locator('.so-step-content h2').inner_text()
 check('journey six steps validation, Back/Next, reload/resume, restart',journey)
 def status():
  visit('/status');page.get_by_role('button',name='Search',exact=True).click();assert page.get_by_text('Lookup failed').is_visible()
  for ref in ['S1-DEMO-100001','S1-DEMO-100002','S1-DEMO-100003']:
   page.get_by_role('button',name=ref,exact=True).click();assert page.get_by_role('region',name='Demo application result').is_visible()
  inp=page.locator('#so-ref');inp.fill('bad');assert page.get_by_role('region',name='Demo application result').count()==0
  inp.press('Enter');assert page.get_by_text('Lookup failed').is_visible()
  inp.fill('S1-DEMO-999999');inp.press('Enter');assert page.get_by_text('No demo application matches',exact=False).is_visible()
 check('status three samples, stale result, empty/invalid/unknown lookup',status)
 for width in [320,375,768,1440]:
  for route in ['/','/delhi','/journey','/status','/state-selection','/services/driving-licence']:
   def responsive():
    page.set_viewport_size({'width':width,'height':900});visit(route)
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),page.evaluate('({scroll:document.documentElement.scrollWidth,width:innerWidth})')
   check(f'responsive {width} {route}',responsive)
 check('browser runtime errors',lambda: (_ for _ in ()).throw(AssertionError(errors)) if errors else None)
 b.close()
print(json.dumps(results,indent=2))
open('/workspace/full-source/production-test-results.json','w').write(json.dumps(results,indent=2))
