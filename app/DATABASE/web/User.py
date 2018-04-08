from settings.endpoints import INSERT_USER_END_POINT, UPDATE_USER_END_POINT
from util.log import c_log as log
from util.http import request
from util.tools import generate_random_str


def insert_into_user(facebook_id, google_id, password, email, first_name, last_name, sex, birthday, is_test=True):
    p = {
        'facebookId': facebook_id,
        'googleId': google_id,
        'password': password,
        'email': email,
        'firstName': first_name,
        'lastName': last_name,
        'sex': sex,
        'birthday': birthday
    }

    response = request(INSERT_USER_END_POINT[0], p, is_post=INSERT_USER_END_POINT[1], is_test=is_test)     # issue http call
    return response


def update_fixture_user(user_id, online_status, is_test=True):
    p = {
        'id': user_id,
        'onlineStatus': online_status
    }
    response = request(UPDATE_USER_END_POINT[0], p, is_post=UPDATE_USER_END_POINT[1], is_test=is_test)     # issue http call
    return response


def populate_fixture_user(first_name, last_name, sex, birthday, is_test=True):

    def g(x=10):
        return generate_random_str(x)

    n = 10
    res = insert_into_user(g(n), g(n), g(n), first_name + '@KenWeb.com', first_name, last_name, sex, birthday, is_test)
    log.info(res)
