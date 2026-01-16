import requests
import sys

filename = input("filename=")
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


# TEST 1 - Admin Service

try:
    url = admin_service + "/api/about"
    data = requests.get(url)

    print("url =", url)
    print("status_code =", data.status_code)
    print("response_text =", data.text)
    print("json =", data.json())

except Exception as e:
    print("problem")
    print(e)

print("\n")


# TEST 2 - Report BEFORE adding cost

print("testing getting the report - before adding cost")

try:
    url = users_service + "/api/report?userid=123123&year=2026&month=1"
    data = requests.get(url)

    print("url =", url)
    print("status_code =", data.status_code)
    print("response_text =", data.text)

except Exception as e:
    print("problem")
    print(e)

print("\n")

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

    data = requests.post(url, json=payload)

    print("url =", url)
    print("status_code =", data.status_code)
    print("response_text =", data.text)

except Exception as e:
    print("problem")
    print(e)

print("\n")


# TEST 4 - Report AFTER adding cost

print("testing getting the report - after adding cost")

try:
    url = users_service + "/api/report?userid=123123&year=2026&month=1"
    data = requests.get(url)

    print("url =", url)
    print("status_code =", data.status_code)
    print("response_text =", data.text)

except Exception as e:
    print("problem")
    print(e)

print("\n")


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

    data = requests.post(url, json=payload)

    print("url =", url)
    print("status_code =", data.status_code)
    print("response_text =", data.text)

except Exception as e:
    print("problem")
    print(e)

print("\n")

print("ALL TESTS FINISHED")
