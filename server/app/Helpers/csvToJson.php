<?php
namespace App\Helpers;

class csvToJson
{
    static function convert($file){
        // open csv file
        if(!($fp = fopen($file, 'r'))){
            die("Can't open file...");
        }

        // read csv headers
        $key = fgetcsv($fp, "1024",",");

        //parse csv rows into array
        $json = array();
        while ($row = fgetcsv($fp, "1024",",")){
            $json[] = array_combine(array_intersect_key($key, $row), array_intersect_key($row, $key));
        }

        //release file handle
        fclose($fp);
        return json_encode($json);
    }
}
