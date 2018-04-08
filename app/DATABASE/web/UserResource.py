from util.http import request
from settings.endpoints import INSERT_END_POINT, SELECT_USER_RESOURCE_END_POINT
from util.log import c_log as log


def populate_fixture_user_resource(user_id, resource_id, local_path, file_name):
    p = {
        'id': ''+user_id,
        'resourceId': ''+resource_id,
        'localPath': local_path,
        'fileName': file_name
    }
    response = request(INSERT_END_POINT, p)     # issue http call
    log.info(response)


def select_fixture_user_resource(user_id, resource_id, http_content_type=None):
    p = {
        'id': ''+user_id,
        'resourceId': ''+resource_id
    }
    if http_content_type is not None:
        p['httpContentType'] = http_content_type
    response = request(SELECT_USER_RESOURCE_END_POINT, p, is_post=True)
    return response
