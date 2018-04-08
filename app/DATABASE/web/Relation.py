from util.http import request
from settings.endpoints import INSERT_RELATION_END_POINT
from util.log import c_log as log


def populate_fixture_relation(desc, is_test=True):
    p = {
        'description': desc
    }
    response = request(INSERT_RELATION_END_POINT[0], p, is_post=INSERT_RELATION_END_POINT[1], is_test=is_test)     # issue http call
    log.info(response)
