<?php

namespace App\Http\Controllers;

use App\Helper\Helper;
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
    public function loadCsv($folderId){
        $file = storage_path('app/public/logins.csv'); //--> laravel helper, but you can use any path here
        return helloWorldHelper($file);
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
