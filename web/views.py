# -*- coding: latin-1 -*-
import json
import threading
from django.core.mail import EmailMessage
from django.template import Context
from django.template.loader import get_template

from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from mpweb.settings import NOMBRE_INSTITUCION, CONTACTO_FORM, EMAIL_HOST_USER, EMAIL_ACTIVE


class EmailThread(threading.Thread):
    def __init__(self, subject, html_content, recipient_list, replyto=None):
        self.subject = subject
        self.recipient_list = recipient_list
        self.html_content = html_content
        self.replyto = replyto
        threading.Thread.__init__(self)

    def run(self):
        try:
            headers = {}
            if self.replyto:
                headers['Reply-To'] = self.replyto
            msg = EmailMessage(self.subject, self.html_content, EMAIL_HOST_USER, self.recipient_list, headers=headers)
            msg.content_subtype = "html"
            msg.send()
        except:
            pass


def send_html_mail(subject, html_template, data, recipient_list, replyto=None):
    template = get_template(html_template)
    d = Context(data)
    html_content = template.render(d)
    EmailThread(subject, html_content, recipient_list, replyto).start()


def index(request):
    return render_to_response("index.html", {'title': 'Home', 'institucion': NOMBRE_INSTITUCION})


def ereputation(request):
    return render_to_response("ereputation.html", {'title': 'E-Reputation'})


def brand(request):
    return render_to_response("brand.html", {'title': 'Brand'})


def responsive(request):
    return render_to_response("responsive.html", {'title': 'Responsive'})


def leaders(request):
    return render_to_response("leaders.html", {'title': 'Leaders'})


def businesses(request):
    return render_to_response("businesses.html", {'title': 'Businesses'})


def ecommerce(request):
    return render_to_response("ecommerce.html", {'title': 'E-Commerce'})


def page(request, num):
    if num == "1":
        obj = 'George Navarro'
    elif num == "2":
        obj = 'Nicolas Palau'
    elif num == "3":
        obj = 'Sandra Delgado'
    else:
        obj = 'Ronald Rivera'
    return render_to_response("book{0}.html".format(num), {'title': 'Books - {}'.format(obj)})


def contacto(request):
    try:
        nombre = request.POST['nombre']
        email = request.POST['email']
        titulo = request.POST['titulo']
        mensaje = request.POST['mensaje']

        data = {'nombre': nombre,
                'email': email,
                'titulo': titulo,
                'mensaje': mensaje,
                'email_host_user': EMAIL_HOST_USER}

        if EMAIL_ACTIVE:
            # contact email confirmation
            send_html_mail("Contact from MP WEB", "emails/contacto.html", data, CONTACTO_FORM)
            # automatic answer send to user
            send_html_mail("Response from MP WEB", "emails/respuestacontacto.html", data, [email])
        return HttpResponse(json.dumps({"result": "ok"}), content_type="application/json")
    except:
        return HttpResponse(json.dumps({"result": "bad"}), content_type="application/json")
