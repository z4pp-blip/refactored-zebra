'use strict'

// app/Controllers/Http/ClientController.js

const Client = use('App/Models/Client');
const Database = use('Database');
const ClientValidator = use('App/Validators/Client');

class ClientController {
  async index({ view }) {
    const clients = await Client.all();
    return view.render('client.index', { clients: clients.toJSON() });
  }

  async create({ view }) {
    return view.render('client.create');
  }

  async store({ request, response, session }) {

    const client = new Client()

      client.name = request.input('name');
      client.email = request.input('email');
      client.phone = request.input('phone');

      await client.save()

      try {
        await request.validate(ClientValidator);
        session.flash({ notification: 'Client created successfully!' });
  
        return response.redirect('/');
      } catch (error) {
        session.withErrors(error.messages).flashAll();
        return response.redirect('back');
      }
    }

  async show({ params, view }) {
    const client = await Client.find(params.id);
    return view.render('clients.show', { client: client.toJSON() });
  }

  async edit({ params, view }) {
    const client = await Client.find(params.id);
    return view.render('clients.edit', { client: client.toJSON() });
  }

  async update({ params, request, response, session }) {
    const data = request.only(['name', 'email', 'phone']);
    const client = await Client.find(params.id);

    try {
      await request.validate(ClientValidator);
      client.merge(data);
      await client.save();
      session.flash({ successmessage: 'Client updated successfully!' });

      return response.redirect(`/clients/${client.id}`);
    } catch (error) {
      session.withErrors(error.messages).flashAll();
      return response.redirect('back');
    }
  }

  async destroy({ params, response, session }) {
    const client = await Client.find(params.id);
    await client.delete();
    session.flash({ successmessage: 'Client deleted successfully!' });

    return response.redirect('/clients');
  }
}

module.exports = ClientController;