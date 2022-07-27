DELIMITER $$
DROP FUNCTION IF EXISTS EveryHasMoved;
CREATE FUNCTION EveryHasMoved (game_id_ INT)
RETURNS BOOLEAN
BEGIN
  DECLARE round_id_, state_, count, count_without_move INT;
  SELECT MAX(id) INTO round_id_ FROM round WHERE game_id = game_id_;
  IF (round_id_ = NULL) THEN
    RETURN FALSE;
  ELSE
    SELECT state INTO state_ FROM round WHERE game_id = game_id_ AND id = round_id_;
    SELECT COUNT(*) INTO count FROM pair WHERE game_id = game_id_ AND round_id = round_id_;
    SELECT COUNT(*) INTO count_without_move FROM pair WHERE game_id = game_id_ AND round_id = round_id_ AND (player1_move = 0 OR player2_move = 0);
    IF (count > 0 AND count_without_move = 0) THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
  END IF;
END$$
DELIMITER ;