<?php

namespace App\Http\Controllers;

use App\Models\Credentials;
use App\Models\Folders;
use App\Models\User;
use Illuminate\Http\Request;

class CredentialsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function cred($userId)
    {
        $user = Credentials::find($userId);
        return $user->folders->credentials;
    }

    public function folderCred($userId,$folderId)
    {
        $user = User::find($userId);
        $folder = $user->folders()->find($folderId);
        return $folder->credentials;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $folderId)
    {
        $data = $request->validate([
            'label' => 'required',
            'url' => 'required',
            'username' => 'required',
            'password' => 'required',
        ]);

            $folder = Folders::find($folderId);
            $credf = $folder->credentials()->create($data);

            $response = [
                'f' => $credf
            ];
            return response($response);
    }
    public function import(){
        $file = storage_path('app/public/logins.csv'); //--> laravel helper, but you can use any path here

        // file() loads each row as an array value, then array map uses the 'str_getcsv' callback to 
          $csv = array_map('str_getcsv', file($file)); 

        //  array_walk - "walks" through each item of the array and applies the call back function. the & in "&row" means that alterations to $row actually change the original $csv array, rather than treating it as immutable (*sort of immutable...)
          array_walk($csv, function(&$row) use ($csv) {
         
            // array_combine takes the header row ($csv[0]) and uses it as array keys for each column in the row
            $row = array_combine($csv[0], $row); 
          });
          
        array_shift($csv); # removes now very redundant column header --> contains {'col_1':'col_1', 'col_2':'col_2'...}
        $json = json_encode($csv);

        return $json;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $userId, $folderId, $credId)
    {
        //
        $user = User::find($userId);
        $folder = $user->folders()->find($folderId);
        $credentials = $folder->credentials()->find($credId);
        $credentials->update($request->all());
        return response($credentials);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $userId, $folderId, $credId)
    {
            $user = User::find($userId);
            $folder = $user->folders()->find($folderId);
            $credf = $folder->credentials()->find($credId);
            $credf->delete();


            $response = [
                'f' => $credf
            ];
            return response($response);
    }

}
