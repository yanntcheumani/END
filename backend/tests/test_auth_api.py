import json

# def test_create_user(client):
#     data = {"username":"testuser","email":"testuser@nofoobar.com","password":"testing"}
#     response = client.post("/auth/login",json.dumps(data))
#     assert response.status_code == 200 
#     assert response.json()["email"] == "testuser@nofoobar.com"
#     assert response.json()["is_active"] == True

url_register_path_v1 = "api/v1/auth/register"
data_valid_register = {"username":"testuser", "email": "test@test.com", "password":"testing"}


url_login_path_v1 = "api/v1/auth/login"
data_login = {"username":"testuser", "password":"testing"}


def test_create_user_without_body(client):
    response = client.post(url_register_path_v1)
    assert response.status_code != 200


def test_create_user_without_email(client):

    response = client.post(url_register_path_v1, json=data_login)

    assert response.status_code == 422


def test_create_user(client):


    response = client.post(url_register_path_v1, json=data_valid_register)

    assert response.status_code == 201
    assert response.json() == {'id': 1, 'email': 'test@test.com', 'username': 'testuser', 'role': []}


def test_login_user_without_body(client):
    response = client.post(url_login_path_v1)

    assert response.status_code == 422

def test_login_user_wrong_header(client):
    response = client.post(url_login_path_v1, json=data_login)
    assert response.status_code != 200

def test_login_user(client):

    response = client.post(url_login_path_v1, data=data_login, headers={"Content-Type": "application/x-www-form-urlencoded"})
    
    print("\n=== DEBUG login response ===")
    print(f"Login Status code: {response.status_code}")
    print(f"Login Response content: {response.content}")
    if response.status_code != 401:
        print(f"Login Response JSON: {response.json()}")
    print("================================\n")
    
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert "type" in response.json()
    assert len(response.json()) == 2
    access_token = response.json()["access_token"]
    response = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {access_token}"})

    print("\n=== DEBUG test_create_user ===")
    print(f"Status code: {response.status_code}")
    print(f"Response content: {response.content}")
    print(f"Response JSON: {response.json()}")
    print("============================================\n")

    assert response.status_code == 200
    assert "username" in response.json()
