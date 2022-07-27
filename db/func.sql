DELIMITER $$
DROP FUNCTION IF EXISTS EveryHasMoved;
CREATE FUNCTION EveryHasMoved (game_id_ INT)
RETURNS BOOLEAN
DECLARE
BEGIN
  DECLARE round_id_, count INT;
  SELECT MAX(id) INTO round_id_ FROM round WHERE game_id = game_id_;
  IF (round_id_ = NULL) THEN
    RETURN FALSE;
  ELSE
    SELECT COUNT(*) INTO count FROM pair WHERE game_id = game_id_ AND round_id = round_id_ AND player1_move > 0 AND player2_move > 0;
    IF (count = 0) THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
  END IF;
END$$
DELIMITER ;