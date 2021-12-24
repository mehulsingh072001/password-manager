<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FoldersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($userId)
    {
        $user = User::find($userId);
        return $user->folders;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $userId)
    {
        $data = $request->validate([
            'name' => 'required'
        ]);

        $user = User::find($userId);
        $folder = $user->folders()->create(['name' => strtolower($data['name'])]);
        return response($user->folders->where('id','=',$folder->id));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($userId, $folderId)
    {
        $user = User::find($userId);
        $folder = $user->folders()->find($folderId);
        return response($folder);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $userId, $folderId)
    {
        $user = User::find($userId);
        /* $folder = $user->folders()->update(['name' => strtolower($request->name)]); */
        /* $folder = $user->folders()->where('id','=',$folderId); */
        $folder = $user->folders()->find($folderId);
        $folder = $folder->update(['name' => strtolower($request->name)]);
        return response($folder);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($userId, $folderId)
    {
        $user = User::find($userId);
        $folder = $user->folders()->find($folderId);
        $folder->delete();
        return response($folder);
    }
}
