<?php
  // require_once("../../www-backend/show_errors.php");

  require_once("../../www-backend/dbdumplib.php");

  $user_context_db_dump = new DbDump("user_context", "context");

  switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
      print($user_context_db_dump->get_by_id());
      break;
    case "POST":
      $user_context_db_dump->post_by_id();
      break;
    case "DELETE":
      $user_context_db_dump->delete_by_id();
      break;
    default:
      http_response_code(405);  # Method Not Allowed
      exit(1);
  }