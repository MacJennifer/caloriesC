<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contact = Contact::all();

        return response()->json($contact);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'lastname' => 'required|max:160',
            'firstname' => 'required|max:160',
            'emailContact' => 'required|max:255',
            'message' => 'required|longText',
        ]);

        $contact = Contact::create($request->all());

        return response()->json([
            'status' => 'Création d\'aliment avec succès',
            'data' => $contact,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        return response()->json($contact);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        $request->validate([
            'lastname' => 'required|max:160',
            'firstname' => 'required|max:160',
            'emailContact' => 'required|max:255',
            'message' => 'required|longText',
        ]);

        $contact->update($request->all());

        return response()->json([
            'status' => 'Création du contact avec succès',
            'data' => $contact,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return response()->json([
            'status' => 'Supprimé avec succès'
        ]);
    }
}
