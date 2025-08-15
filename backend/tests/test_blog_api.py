from schemas.blog import BlogCreate

url_login_path_v1 = "api/v1/auth/login"
data_login = {"username":"testuser", "password":"testing"}

access_token = None

url_blog_path_v1 = "api/v1/blog/"


def test_create_blog_without_body(client):
    if not access_token:    
        response_login = client.post(url_login_path_v1, data=data_login, headers={"Content-Type": "application/x-www-form-urlencoded"})
        
        assert response_login.status_code == 200
        assert "access_token" in response_login.json()
        assert "type" in response_login.json()
        assert len(response_login.json()) == 2
        access_token = response_login.json()["access_token"]
    
    response_create_blog = client.post(url_blog_path_v1)
    assert response_login.status_code == 422


def test_create_blog_without_no_required_params(client):
    if not access_token:    
        response_login = client.post(url_login_path_v1, data=data_login, headers={"Content-Type": "application/x-www-form-urlencoded"})

        assert response_login.status_code == 200
        assert "access_token" in response_login.json()
        assert "type" in response_login.json()
        assert len(response_login.json()) == 2
        access_token = response_login.json()["access_token"]
    blog = BlogCreate(title="test", description="test")
    response_create_blog = client.post(url_blog_path_v1, json=blog.model_dump_json())
    
