INSERT_END_POINT = '_loadFileIntoDatabase'

INSERT_USER_END_POINT = ('insertUser', True)    # The second parameter is post request if it is true
INSERT_RESOURCE_END_POINT = ('insertResource', True)

INSERT_USER_LOCATION_END_POINT = 'insertUserLocation'

INSERT_RELATION_END_POINT = ('insertRelation', True)
INSERT_USER_RELATION_END_POINT = ('insertUserRelation', True)
INSERT_NOTIFICATION_END_POINT = ('insertNotification', True)
INSERT_USER_NOTIFICATION_END_POINT = ('insertUserNotification', True)


# These are the select statements
SELECT_END_POINT = 'getUserResource'
SELECT_USER_LOCATION_END_POINT = 'findFriends'
SELECT_USER_RESOURCE_END_POINT = 'getUserResource'
SELECT_USER_NOTIFICATION_END_POINT = ('getUserNotification', True)


# These are delete statements
DELETE_USER_LOCATION_END_POINT = 'deleteUserLocation'


# These are upate statements
UPDATE_USER_END_POINT = ('updateUser', True)    # The second parameter is post request if it is true
UPDATE_USER_RELATION_END_POINT = ('updateUserRelation', True)
UPDATE_USER_LOCATION_END_POINT = ('_updateUserLocation', True)
UPDATE_USER_NOTIFICATION_END_POINT = ('updateUserNotification', True)
