from playwright.sync_api import sync_playwright
import json
r=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 page=b.new_page();page.set_default_timeout(4000)
 def run(name,f):
  try:f();r.append({'test':name,'result':'PASS'})
  except Exception as e:r.append({'test':name,'result':'FAIL','detail':str(e)[:500]})
 def go(route):page.goto('http://127.0.0.1:5181'+route)
 def original():
  go('/original');page.get_by_role('button',name='Close',exact=True).click();page.get_by_role('link',name='Back to SARATHI ONE home').click();page.wait_for_url('http://127.0.0.1:5181/')
 run('original popup close and return home',original)
 def selection():
  page.evaluate('localStorage.clear()');go('/state-selection');page.get_by_role('button',name='Continue',exact=True).click();assert page.get_by_text('Selection required').is_visible()
  picker=page.get_by_role('combobox');picker.fill('Delhi');picker.press('Enter');page.get_by_role('button',name='Continue',exact=True).click();page.wait_for_url('**/journey')
 run('state-selection required validation and Delhi journey navigation',selection)
 def persisted():
  go('/');page.evaluate('''localStorage.setItem('sarathiOne.journey.v1',JSON.stringify({stateCode:'INVALID',serviceId:'invalid',step:999,checklist:null,applicant:{name:'must not persist',confirmed:'false'}}))''');page.reload();go('/journey');assert 'Step 1' in page.locator('.so-step-content h2').inner_text()
  stored=page.evaluate("JSON.parse(localStorage.getItem('sarathiOne.journey.v1'))");assert stored['stateCode']==None and stored['serviceId']==None and 'name' not in stored['applicant'] and stored['applicant']['confirmed']==False
  page.evaluate("localStorage.setItem('sarathiOne.journey.v1','{invalid')");page.reload();assert 'Step 1' in page.locator('.so-step-content h2').inner_text()
 run('invalid saved step/state/service/fields and corrupt JSON recovery',persisted)
 b.close()
print(json.dumps(r,indent=2));open('/workspace/full-source/extra-test-results.json','w').write(json.dumps(r,indent=2))
