from util.http import request
from settings.endpoints import INSERT_USER_LOCATION_END_POINT, SELECT_USER_LOCATION_END_POINT, DELETE_USER_LOCATION_END_POINT, UPDATE_USER_LOCATION_END_POINT
from util.log import c_log as log
from util.tools import empty


def populate_fixture_user_location(user_id, lnt, lng, message, user_relation_id=None, timeout=None, radius_in_mile='10'):
    p = {
        'id': user_id,
        'lnt': lnt,
        'lng': lng,
        'message': message
    }

    if not empty(user_relation_id):
        p['userRelationId'] = user_relation_id
    if not empty(timeout):
        p['timeout'] = timeout
    if not empty(radius_in_mile):
        p['radiusInMile'] = radius_in_mile

    response = request(INSERT_USER_LOCATION_END_POINT, p, is_post=True)     # issue http post call
    log.info('populate_fixture_user_location - ' + response)
    return response


def update_fixture_user_location(user_id, created_time, ):
    p = {
        'id': user_id,
        'createdTime': created_time
    }
    response = request(UPDATE_USER_LOCATION_END_POINT[0], p, is_post=UPDATE_USER_LOCATION_END_POINT[1])     # issue http post call
    return response


def select_fixture_user_location(user_id, relation_id, lnt, lng, radius_in_miles, intention):
    p = {
        'id': user_id,
        'lat': lnt,
        'lng': lng,
        'radiusInMiles': radius_in_miles,
        'intention': intention
    }
    if not empty(relation_id):
        p['relationId'] = relation_id

    response = request(SELECT_USER_LOCATION_END_POINT, p)     # issue http post call
    return response


def delete_fixture_user_location(id):
    p = {
        'id': id
    }
    response = request(DELETE_USER_LOCATION_END_POINT, p, is_post=True)     # issue http post call
    log.info('delete_fixture_user_location - ' + response)
    return response
