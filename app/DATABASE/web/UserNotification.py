from util.http import request
from settings.endpoints import INSERT_USER_NOTIFICATION_END_POINT, SELECT_USER_NOTIFICATION_END_POINT, UPDATE_USER_NOTIFICATION_END_POINT
from util.tools import empty


def populate_fixture_user_notification(user_id, issuer_id, notification_id, content, is_test=True):
    p = {
        'id': user_id,
        'issuerId': issuer_id,
        'notificationId': notification_id,
        'content': content
    }

    end_point = INSERT_USER_NOTIFICATION_END_POINT
    response = request(end_point[0], p, is_post=end_point[1], is_test=is_test)     # issue http call
    return response


def select_fixture_user_notification(user_id, up_to_how_many_days=None, is_test=True):
    p = {
        'id': user_id
    }

    if not empty(up_to_how_many_days):
        p['upToHowManyDays'] = up_to_how_many_days

    end_point = SELECT_USER_NOTIFICATION_END_POINT
    response = request(end_point[0], p, is_post=end_point[1], is_test=is_test)     # issue http call
    return response


def update_fixture_user_notification(ids_str, is_seen, is_deleted, is_test=True):
    p = {
        'idsStr': ids_str,
        'isSeen': is_seen,
        'isDeleted': is_deleted
    }

    end_point = UPDATE_USER_NOTIFICATION_END_POINT
    response = request(end_point[0], p, is_post=end_point[1], is_test=is_test)     # issue http call
    return response
