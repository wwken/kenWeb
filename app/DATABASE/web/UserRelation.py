from util.http import request
from settings.endpoints import INSERT_USER_RELATION_END_POINT, UPDATE_USER_RELATION_END_POINT


def populate_fixture_user_relation(user_id, relation_id, relation, description='', is_update=False, is_test=True):
    p = {
        'id': user_id,
        'relationId': relation_id,
        'relation': relation,
        'description': description
    }

    end_point = INSERT_USER_RELATION_END_POINT

    if is_update:
        end_point = UPDATE_USER_RELATION_END_POINT

    response = request(end_point[0], p, is_post=end_point[1], is_test=is_test)     # issue http call
    return response
