<?php
  require_once("../../www-backend/show_errors.php");

  require_once("../../www-backend/check.php");
  require_once("../../www-backend/dbdumplib.php");
  require_once("../../www-backend/kafka.php");
  require_once("../../www-backend/validate.php");

  function post_mood() {
    check_post_arguments(array("id", "mood_metrics"));

    $id = $_POST["id"];
    $mood_metrics = $_POST["mood_metrics"];
    $user_context = (new DbDump("user_context", "context"))->get_by_id();
    validate_id($id);
    $mood_metrics_array = validate_mood_metrics($mood_metrics);
    $user_context_array = validate_user_context($user_context);
    $timestamp_sec = microtime(true);

    post_kafka(
      "mood",
      "${id}/${timestamp_sec}",
      json_encode(array(
        "mood_metrics" => $mood_metrics_array,
        "user_context" => $user_context_array,
        "timestamp_sec" => $timestamp_sec,
      )),
    );
  }

  switch ($_SERVER["REQUEST_METHOD"]) {
    case "POST":
      post_mood();
      break;
    default:
      http_response_code(405);  # Method Not Allowed
      exit(1);
  }