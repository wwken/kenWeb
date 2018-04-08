from util.http import request
from settings.endpoints import INSERT_NOTIFICATION_END_POINT


def populate_fixture_notification(desc, template, is_test=True):
    p = {
        'description': desc,
        'template': template
    }
    request(INSERT_NOTIFICATION_END_POINT[0], p, is_post=INSERT_NOTIFICATION_END_POINT[1], is_test=is_test)     # issue http call
