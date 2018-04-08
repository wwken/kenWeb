from util.unitTestBase import UnitTestBase
from web.UserLocation import select_fixture_user_location, populate_fixture_user_location, delete_fixture_user_location,update_fixture_user_location
from web.UserRelation import populate_fixture_user_relation
from web.User import update_fixture_user
from util.tools import retrieve_from_response, retrieve_inserted_id, generate_time_str_from_mins_ago


def retrieve(user_id, r_id, lat, lng, miles, msg):
    res = select_fixture_user_location(user_id, r_id, lat, lng, miles, msg)     # with empty intention
    rows = retrieve_from_response(res, 'user_id')
    return rows

# UserLocation
# Ken (#1) is friend of (#8)
my_current_lat = '40.587372'
my_current_lng = '-73.986032'
relation_id = '2'   # facebook friend list
miles_within = '5'


class UserLocationTestCase(UnitTestBase):
    def test_UserLocation_1_empty_intention(self):
        user_id_rows = retrieve('1', relation_id, my_current_lat, my_current_lng, miles_within, '')     # with empty intention
        self.assertContain(user_id_rows, [2, 3, 4, 8])

    def test_UserLocation_2_sing_k_intention(self):
        user_id_rows = retrieve('1', relation_id, my_current_lat, my_current_lng, '0.1', 'sing')     # within very few streets
        self.assertNotContain(user_id_rows, [2, 3, 4, 8])

    def test_UserLocation_3_sing_k_intention_2(self):
        user_id_rows = retrieve('1', relation_id, my_current_lat, my_current_lng, miles_within, 'sing')     # with some intention
        self.assertContain(user_id_rows, [8])
        self.assertNotContain(user_id_rows, [2, 3, 4])

    # This one contains insert statement
    def test_UserLocation_4_not_found_and_found_again(self):
        # Now the interested user update her location with newer message so the previous intention cannot be found
        inserted_response = populate_fixture_user_location('8', '40.621012', '-73.988510', 'go home sleep...')
        inserted_id = retrieve_inserted_id(inserted_response)
        user_id_rows = retrieve('1', relation_id, my_current_lat, my_current_lng, miles_within, 'sing')     # with some intention
        self.assertContain(user_id_rows, None)
        self.assertNotContain(user_id_rows, [2, 3, 4, 8])
        # Now clean up that inserted_id
        deleted_response = delete_fixture_user_location(inserted_id)

        inserted_response = populate_fixture_user_location('8', '40.621012', '-73.988510', 'I wanna sing k again!')
        # import sys
        # sys.path.append("/Applications/PyCharm.app/Contents/debug-eggs/pycharm-debug.egg")
        # import pydevd
        # pydevd.settrace('localhost', port=12345, stdoutToServer=True, stderrToServer=True)

        user_id_rows = retrieve('1', relation_id, my_current_lat, my_current_lng, miles_within, 'sing')     # with some intention
        self.assertContain(user_id_rows, [8])

    def test_UserLocation_5_unfriend_and_refriend(self):
        populate_fixture_user_relation('1', relation_id, '-2-3-4-5-6-', is_update=True)     # unfriend Yuri and Eileen
        user_id_rows = retrieve('1', relation_id, my_current_lat, my_current_lng, miles_within, 'sing')     # with some intention
        self.assertNotContain(user_id_rows, [8])

        user_id_rows = retrieve('1', '', my_current_lat, my_current_lng, miles_within, 'sing')     # But if search anyone Yuri should come up
        self.assertContain(user_id_rows, [8])

        populate_fixture_user_relation('1', relation_id, '-2-3-4-5-6-7-8-', is_update=True)     # friend Yuri and Eileen back
        user_id_rows = retrieve('1', relation_id, my_current_lat, my_current_lng, miles_within, 'sing')     # with some intention
        self.assertContain(user_id_rows, [8])

    def test_UserLocation_6_privacy_level(self):

        def q():
            return retrieve('1', '', my_current_lat, my_current_lng, miles_within, 'boring')

        # By default, stephine should show up beacuse her check in has privacy level set to 5 which has Me in it
        user_id_rows = q()
        self.assertContain(user_id_rows, [12])

        # Now update the check in with girls group only: id 6
        populate_fixture_user_location('12', '40.620571', '-73.992199', 'boring 1', '6', '120', '3')
        user_id_rows = q()
        self.assertNotContain(user_id_rows, [12])

        # revert back to the original data
        populate_fixture_user_location('12', '40.620571', '-73.992199', 'boring 2', '5', '120', '3')
        user_id_rows = q()
        self.assertContain(user_id_rows, [12])

    # This tests the radius_in_mile
    def test_UserLocation_7_radius(self):
        def q():
            return retrieve('1', '', my_current_lat, my_current_lng, '30', 'gym')

        def u(radius_in_mile):
            populate_fixture_user_location('11', '40.692471', '-73.857112', 'gym workout', '2', '30', radius_in_mile)  # WoodHeaven, Queens NY

        # By default, Wayne should show up beacuse his check in matches for doing gym
        user_id_rows = q()
        self.assertContain(user_id_rows, [11])

        # Now update the check in by reducing the radius_in_mile to 5
        u(radius_in_mile='5')
        user_id_rows = q()
        self.assertNotContain(user_id_rows, [11])

        # revert back to the original data
        u(radius_in_mile='15')
        user_id_rows = q()
        self.assertContain(user_id_rows, [11])

    # # This tests the timeout
    def test_UserLocation_8_timeout(self):
        def q():
            return retrieve('1', '', my_current_lat, my_current_lng, '30', 'gym')

        def u(created_time):
            update_fixture_user_location('11', created_time)  # user_id 11 in UserLocation is referred

        # By default, Wayne should show up beacuse his check in matches for doing gym
        user_id_rows = q()
        self.assertContain(user_id_rows, [11])

        u(generate_time_str_from_mins_ago(45))    # Arbitrary set the timeout to 45mins long time ago while in fixutre data it is 30mins (at id 9)
        user_id_rows = q()
        self.assertNotContain(user_id_rows, [11])   # Now it should not find

        u(generate_time_str_from_mins_ago(28))    # Arbitrary set the timeout to 28mins long time ago while in fixutre data it is 30mins (at id 9)
        user_id_rows = q()
        self.assertContain(user_id_rows, [11])   # Now it should find

        u(generate_time_str_from_mins_ago(1))    # revert back to the original data
        user_id_rows = q()
        self.assertContain(user_id_rows, [11])   # Now it should find

    # # This tests the online_status change
    def test_UserLocation_9_online_status_change(self):
        test_targeted_user_id = 12

        def q():
            return retrieve('1', '', my_current_lat, my_current_lng, '30', '')

        def u(online_status):
            update_fixture_user(str(test_targeted_user_id), online_status)  # user_id 11 in UserLocation is referred

        # By default, Wayne should show up
        user_id_rows = q()
        self.assertContain(user_id_rows, [test_targeted_user_id])

        u(0)    # Set the targed user offline
        user_id_rows = q()
        self.assertNotContain(user_id_rows, [test_targeted_user_id])

        u(1)    # Set the targed user online again
        user_id_rows = q()
        self.assertContain(user_id_rows, [test_targeted_user_id])



