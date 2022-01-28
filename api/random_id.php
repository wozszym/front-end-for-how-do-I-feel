<?php
  if ($_SERVER["REQUEST_METHOD"] != 'GET') {
    http_response_code(405);  # Method Not Allowed
    exit(1);
  }

  print(hash('sha256', uniqid().gethostname()."how-do-i-feel.info"));