<?php
  require_once("../../www-backend/show_errors.php");

  require_once("../../www-backend/dbdumplib.php");

  $aggregation_policy_db_dump = new DbDump("aggregation_policy", "policy");

  switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
      print($aggregation_policy_db_dump->get_by_id());
      break;
    case "POST":
      $aggregation_policy_db_dump->post_by_id();
      break;
    case "DELETE":
      $aggregation_policy_db_dump->delete_by_id();
      break;
    default:
      http_response_code(405);  # Method Not Allowed
      exit(1);
  }
