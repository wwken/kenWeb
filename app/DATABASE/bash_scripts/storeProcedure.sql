DELIMITER ;;
drop procedure if exists findFriends;
CREATE DEFINER=`root`@`localhost` PROCEDURE `findFriends`(
    IN pUserId INT,
    IN pRelationId INT,
    IN pLat float,
    IN pLng float,
    IN pRadiusInMiles float,
    IN pIntention VARCHAR(255),
    IN pLowerLimit INT,
    IN pUpperLimit INT
)
BEGIN
    DECLARE lowerLimit INT;
    DECLARE upperLimit INT;
    
    set lowerLimit = 0;
    if pLowerLimit is not NULL then
        set lowerLimit = pLowerLimit;
    end if;
    
    set upperLimit = 30;
    if pUpperLimit is not NULL then
        set upperLimit = pUpperLimit;
    end if;
    
    SELECT
  ul.user_id, u.first_name, u.last_name, u.sex, (
    3959 * acos (
      cos ( radians(pLat) )
      * cos( radians( X(location) ) )
      * cos( radians( Y(location) ) - radians(pLng) )
      + sin ( radians(pLat) )
      * sin( radians( X(location) ) )
    )
  ) AS distance,
  message,
  aswkt(ul.location) as p  
    FROM UserLocation ul
    INNER JOIN User u on u.id = ul.user_id
    WHERE is_present = 1
    AND (LENGTH(pIntention)=0 OR MATCH(message) AGAINST (pIntention in NATURAL LANGUAGE MODE))
    AND (pRelationId is NULL or ( EXISTS (select 1 from UserRelation ur where ur.user_id = pUserId and ur.relation_id = pRelationId and INSTR(ur.relation, CONCAT('-', ul.user_id, '-'))) ))
    HAVING distance < pRadiusInMiles
    ORDER BY distance
    LIMIT lowerLimit , upperLimit;
    
END;;
DELIMITER ;