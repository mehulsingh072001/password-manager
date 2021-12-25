<?php

namespace App\Http\Controllers;

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
        $user = User::find($userId);
        return $user->credentials;
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
    public function store(Request $request, $userId, $folderId)
    {
        $data = $request->validate([
            'label' => 'required',
            'username' => 'required',
            'password' => 'required'
        ]);

        if($request->folder){
            $folder = Folders::find($folderId);
            $credf = $folder->credentials()->create($data);

            $user = User::find($userId);
            $credu = $user->credentials()->create($data);

            $response = [
                'f' => $credf,
                'u' => $credu
            ];
            return response($response);
        }
        else{
            $user = User::find($userId);
            $cred = $user->credentials()->create($data);
            return response($cred);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /* public function destroy(Request $request, $userId, $folderId, $credId) */
    /* { */
    /*     if($request->folder){ */
    /*         $folder = Folders::find($folderId); */
    /*         $credf = $folder->credentials()->find($credId); */
    /*         $credf->delete(); */

    /*         $user = User::find($userId); */
    /*         $credu = $user->credentials()->find($credId); */
    /*         /1* $credu->delete; *1/ */

    /*         $response = [ */
    /*             'f' => $credf, */
    /*             'u' => $credu */
    /*         ]; */
    /*         return response($response); */
    /*     } */
    /*     else{ */
    /*         /1* $user = User::find($userId); *1/ */
    /*         /1* $cred = $user->credentials()->create($data); *1/ */
    /*         /1* return response($cred); *1/ */
    /*         $user = User::find($userId); */
    /*         $cred = $user->credentials()->find($credId); */
    /*         $cred->delete(); */
    /*         return response($cred); */

    /*     } */
    /* } */
}
