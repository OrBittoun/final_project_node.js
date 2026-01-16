import requests
import sys
import json

filename = input("insert file name : ")
output = open(filename, "w", encoding="utf-8")
sys.stdout = output

logs_service  = "https://logs-service-0hie.onrender.com"
users_service = "https://users-service-mrj2.onrender.com"
costs_service = "https://final-project-node-js-b6sp.onrender.com"
admin_service = "https://admin-service-bbhl.onrender.com"

print("logs =", logs_service)
print("users =", users_service)
print("costs =", costs_service)
print("admin =", admin_service)
print()


def pretty_print_response(title, resp):
    print(title)
    print("url =", resp.url)
    print("status_code =", resp.status_code)
    try:
        data = resp.json()
        print("response_json_pretty =")
        print(json.dumps(data, ensure_ascii=False, indent=4))
    except Exception:
        print("response_text =", resp.text)
    print()


# TEST 1 - Admin Service
try:
    url = admin_service + "/api/about"
    resp = requests.get(url)
    pretty_print_response("TEST 1 - Admin Service", resp)
except Exception as e:
    print("problem in TEST 1")
    print(e)
    print()

# TEST 2 - Report BEFORE adding cost
print("testing getting the report - before adding cost")
try:
    url = users_service + "/api/report?userid=123123&year=2026&month=1"
    resp = requests.get(url)
    pretty_print_response("TEST 2 - Report BEFORE", resp)
except Exception as e:
    print("problem in TEST 2")
    print(e)
    print()

# TEST 3 - Add cost item
print("testing adding cost item")
try:
    url = costs_service + "/api/add"
    payload = {
        "userid": 123123,
        "description": "milk 9",
        "category": "food",
        "sum": 8
    }
    resp = requests.post(url, json=payload)
    pretty_print_response("TEST 3 - Add cost", resp)
except Exception as e:
    print("problem in TEST 3")
    print(e)
    print()

# TEST 4 - Report AFTER adding cost
print("testing getting the report - after adding cost")
try:
    url = users_service + "/api/report?userid=123123&year=2026&month=1"
    resp = requests.get(url)
    pretty_print_response("TEST 4 - Report AFTER", resp)
except Exception as e:
    print("problem in TEST 4")
    print(e)
    print()

# TEST 5 - Logs
print("testing sending log manually")
try:
    url = logs_service + "/api/logs"
    payload = {
        "method": "GET",
        "endpoint": "/api/report",
        "status": 200,
        "message": "python test log"
    }
    resp = requests.post(url, json=payload)
    pretty_print_response("TEST 5 - Logs", resp)
except Exception as e:
    print("problem in TEST 5")
    print(e)
    print()

print("ALL TESTS FINISHED")
