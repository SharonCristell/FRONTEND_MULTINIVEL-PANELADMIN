import React from 'react';
import { Form, Table, Button, Modal, Row, Spinner } from 'react-bootstrap';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactTable from "react-table";

import logoKeOla from '../../images/KeOlaPdf.jpg';
import logoInClub from '../../images/InClubPdf.png';
import logoIntech from '../../images/InTechPdf.png';

import jsPDF from "jspdf";
import "jspdf-autotable";

export default class DocumentView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            discountPlan: [
                { benefits: "Articulos en la tienda Keola", free: "0%", classic: "10%", gold: "10.0%", platinum: "15.0%", elite: "20.0%", premium: "30.0%", infinite: "40.0%" },
            ],

            personalAccount: [
                { benefits: "DURACION", free: "30", classic: "30", gold: "30", platinum: "30", elite: "30", premium: "30", infinite: "30" },
                { benefits: "RENOVACION AUTOMATICA con HISTORIAL", free: "-", classic: "SI", gold: "SI", platinum: "SI", elite: "SI", premium: "SI", infinite: "SI" },
                { benefits: "UBICACION LISTADOS", free: "INFERIOR 2°", classic: "INFERIOR 1°", gold: "MEDIA 3°", platinum: "MEDIA 2°", elite: "MEDIA 1°", premium: "SUPERIOR 2°", infinite: "SUPERIOR 1°" },
                { benefits: "ROTACION DE IMÁGENES", free: "-", classic: "-", gold: "-", platinum: "SI", elite: "SI%", premium: "SI", infinite: "SI" },
                { benefits: "DESTAQUE EN LISTADO", free: "-", classic: "-", gold: "-", platinum: "SI", elite: "SI%", premium: "SI", infinite: "SI" },
                { benefits: "LIBRE DE PUBLICIDAD", free: "-", classic: "-", gold: "SI", platinum: "SI", elite: "SI", premium: "SI", infinite: "SI" },
                { benefits: "CARGO DE VENTA", free: "GRATIS", classic: "GRATIS", gold: "GRATIS", platinum: "GRATIS", elite: "GRATIS", premium: "GRATIS", infinite: "GRATIS" },
                { benefits: "CANTIDAD DE ANUNCIOS Y/O ARTICULOS EN PARALELO", free: "1", classic: "5", gold: "10", platinum: "15", elite: "20", premium: "25", infinite: "30" },
            ],

            businessAccount: [
                { benefits: "CANTIDAD TIENDAS", free: "1", classic: "1", gold: "2", platinum: "3", elite: "4", premium: "5", infinite: "6" },
                { benefits: "UBICACION LISTADOS", free: "INFERIOR 2°", classic: "INFERIOR 1°", gold: "MEDIA 3°", platinum: "MEDIA 2°", elite: "MEDIA 1°", premium: "SUPERIOR 2°", infinite: "SUPERIOR 1°" },
                { benefits: "REPOSTERÍA", free: "-", classic: "SI", gold: "SI", platinum: "SI", elite: "SI", premium: "SI", infinite: "SI" },
                { benefits: "INTEGRACIÓN TIENDA ONLINE PROPIA BÁSICA", free: "-", classic: "-", gold: "-", platinum: "-", elite: "SI", premium: "SI", infinite: "-" },
                { benefits: "INTEGRACIÓN TIENDA ONLINE PROPIA BÁSICA", free: "-", classic: "-", gold: "-", platinum: "-", elite: "-", premium: "-", infinite: "SI" },
                { benefits: "LIBRE DE PUBLICIDAD", free: "-", classic: "SI", gold: "SI", platinum: "SI", elite: "SI", premium: "SI", infinite: "SI" },
                { benefits: "CANTIDAD DE PRODUCTOS CATALOGO", free: "25", classic: "50", gold: "100", platinum: "ILIMITADO", elite: "ILIMITADO", premium: "ILIMITADO", infinite: "ILIMITADO" },
                { benefits: "CARGO DE VENTA", free: "GRATIS", classic: "GRATIS", gold: "GRATIS", platinum: "GRATIS", elite: "GRATIS", premium: "GRATIS", infinite: "GRATIS" },
            ],

            affiliation: [
                { membershipType: "TIPO DE MEMBRESIA", type1: "1 Membresia", type2: "2 Membresias", type3: "3 Membresias" },
                { membershipType: "CLASSIC", type1: "MINI", type2: "MINI", type3: "MINI" },
                { membershipType: "GOLD", type1: "MINI", type2: "EXPERIENCE", type3: "EXPERIENCE+MINI" },
                { membershipType: "PLATINUM", type1: "EXPERIENCE", type2: "LIGHT", type3: "STANDARD" },
                { membershipType: "ELITE", type1: "EXPERIENCE+MINI", type2: "STANDARD", type3: "-" },
                { membershipType: "PREMIUM", type1: "LIGHT", type2: -"", type3: "-" },
                { membershipType: "INFINITE", type1: "STANDARD", type2: "-", type3: "-" },
            ],

            id: 0,
            user: {
                name: "",
                lastname: "",
                birthdate: "",
                gender: "",
                nroDocument: "",
                districtAddress: "",
                address: "",
                username: "",
                civilState: "",

            },
            userMod: {

            },
            loading: true,
        }
    }
    componentDidMount() {
        let user = AuthService.getCurrentUserInfo();
        if (user !== undefined) {
            let userInfo = {
                name: user.name,
                lastname: user.lastname,
                birthdate: user.birthdate,
                gender: user.gender,
                nroDocument: user.nroDocument,
                districtAddress: user.districtAddress,
                address: user.address,
                username: user.username,
                civilState: user.civilState
            }
            this.setState({
                user: this.state.user = userInfo,
                id: this.state.id = user.id,
                loaded: true
            });
        } else {
            this.setState({
                user: this.state.user = {},
                id: this.state.id = 0,
                loaded: false
            });
        }

    }

    jsPdfGenerator = () => {

        const unit = 'pt';
        const size = 'A4';
        const orientation = 'portrait';

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        const img = new Image;

        doc.setFontSize(12);

        const title = "PLAN DE DESCUENTOS";
        const headers = [["BENEFICIOS", "GRATUITA $0", "CLASSIC $5", "GOLD $15", "PLATINIUM $30", "ELITE $45", "PREMIUM $60", "INFINITE $90"]]

        const data = this.state.discountPlan.map(elt => [elt.benefits, elt.free, elt.classic, elt.gold, elt.platinum, elt.elite, elt.premium, elt.infinite]);

        let content = {
            startY: 450,
            head: headers,
            body: data
        };

        const title2 = "CUENTA PUBLICITARIA PERSONAL";

        const data2 = this.state.personalAccount.map(elt => [elt.benefits, elt.free, elt.classic, elt.gold, elt.platinum, elt.elite, elt.premium, elt.infinite]);

        let content2 = {
            startY: 560,
            head: headers,
            body: data2
        };

        const title3 = "CUENTA PUBLICITARIA NEGOCIOS";


        const data3 = this.state.businessAccount.map(elt => [elt.benefits, elt.free, elt.classic, elt.gold, elt.platinum, elt.elite, elt.premium, elt.infinite]);
        let content3 = {
            startY: 240,
            head: headers,
            body: data3
        };

        const title4 = "Tabla de Afiliacion InResorts (Beneficio de duplicacion de Acciones Keola)";

        //const headers4 = [["TIPO DE MEMBRESIA", "1 Membresia", "2 Membresias", "3 Membresias"]];
        const headers4 = [["                    ", "", "KEOLA", ""]];

        const data4 = this.state.affiliation.map(elt => [elt.membershipType, elt.type1, elt.type2, elt.type3]);

        let content4 = {
            startY: 600,
            head: headers4,
            body: data4
        };

        doc.addImage(logoInClub, 20, 5, 120, 70);
        doc.addImage(logoKeOla, 200, 5, 180, 100);
        doc.addImage(logoIntech, 430, 5, 120, 70);

        doc.setFontSize(16);
        doc.text('                                    ACLARA:                ', 90, 120)
        doc.setFont('Arial');
        doc.setFontSize(15);
        doc.text('Que el contrato ' + this.state.user.username + ' a nombre del Sr.(a) ' + this.state.user.name + " " + this.state.user.lastname + " identificado", 40, 170)
        doc.text('con DNI ' + this.state.user.nroDocument + ' podrá hacer uso de los beneficios de su membresía EXPERIENCE', 40, 185)
        doc.text('una vez cancelado el valor de la cuota inicial, según sus especificaciones de su contrato.', 40, 200)

        doc.setFont('Arial');
        doc.setFontSize(13);
        doc.text('Activa sus beneficios según los plazos indicados en contrato de la siguiente manera:', 40, 230)
        doc.text('        - Plan Descuentos: 20% hasta 40% en la Tienda Keola ', 40, 245)
        doc.text('        - Plan Publicitario: Personal y Negocios PLATINIUM ', 40, 260)
        doc.text('        - En caso de hacerse socio de un Desarrollo Hotelero de inResorts, durante el', 40, 275)
        doc.text('          primer año, se DUPLICARIAN las acciones adquiridas de Keola según la Tabla', 40, 290)
        doc.text('          de afiliación a inResorts adjunta en este documento.', 40, 305)

        doc.text('                                               ----------------------------------         ', 70, 370)
        doc.addImage(logoInClub, 265, 371, 70, 45);
        doc.setFontSize(8);
        doc.text('                                                                      RUC: 20601460271                    ', 135, 420)

        doc.setFont('Arial');
        doc.setFontSize(13);
        doc.text(title, marginLeft, 440);
        doc.setFontSize(10);
        doc.autoTable(content);

        doc.setFont('Arial');
        doc.setFontSize(10);
        doc.text('* Duracion de uso de paquete anual', 40, 530)



        doc.setFontSize(13);
        doc.text(title2, marginLeft, 550);
        doc.setFontSize(10);
        doc.autoTable(content2);
        doc.setFont('Arial');
        doc.setFontSize(10);

        doc.text('* Duracion de uso de paquete mensual', 40, 150)

        doc.setFont('Arial');
        doc.setFontSize(9);
        doc.text('Si vendes productos usados, podras publicar en gratuito hasta alcanzar las 20 ventas en el ultimo año.', 60, 170)
        doc.text('Si vendes productos nuevos, podras publicar en gratuito hasta alcanzar las 5 ventas en el ultimo año.', 60, 180)
        doc.text('Si republicas una publicacion gratuita ,no acumulara las visitas ni la venta del anterior.', 60, 190)
        doc.text('Si eres KeolaTop o usuario profesional de KEOLAPago solo podras publicar en Classic,Gold o Platinium.', 60, 200)

        doc.setFont('Arial');
        doc.setFontSize(13);
        doc.text(title3, marginLeft, 230);
        doc.autoTable(content3);

        doc.setFont('Arial');
        doc.setFontSize(10);
        doc.text('* Duracion de uso de paquete 1 mes', 40, 570)

        doc.setFont('Arial');
        doc.setFontSize(13);
        doc.text(title4, marginLeft, 590);

        doc.autoTable(content4);
        doc.setFontSize(10);
        doc.text('CORREOS: servicioalcliente@keola.club o pagos@keola.club', 170, 810);
        doc.text('pagos@keola.club', 250, 825);
        doc.setFont('Arial');


        doc.save("CER" + this.state.user.username + ".pdf")
    }

    jsPdfGenerator2 = () => {

        const unit = 'pt';
        const size = 'A4';
        const orientation = 'portrait';

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
        const img = new Image;

        doc.addImage(logoInClub, 20, 5, 120, 70);
        doc.addImage(logoKeOla, 220, 5, 100, 70);
        doc.addImage(logoIntech, 430, 5, 120, 70);

        doc.setFontSize(12);
        doc.text('CONTRATO DE PRESTACION DE SERVICIOS CON OPCION A PARTICIPACION', 60, 80)
        doc.setFont('Arial');
        doc.setFontSize(11);
        doc.text('Conste por el presente documento que se extiende por duplicado, el CONTRATO DE PRESTACION DE SERVICIOS', 30, 110)
        doc.text('CON OPCION A PARTICIPACIÓN que celebran:', 30, 120)
        doc.text('De una parte, Valle Encantado S.A.C. identificada con RUC 20601460271, domiciliada en Mz. B Lote 72, tercera', 30, 140)
        doc.text('Etapa Cieneguilla, Provincia de Lima y Departamento de Lima, a quien en adelante se le denominará el PRESTADOR;', 30, 150)
        doc.text('y de la otra parte.', 30, 160)

        doc.text('Nombres y Apellidos :     ' + this.state.user.name + " " + this.state.user.lastname + " ", 30, 180)
        doc.text('Carnet o cedula de extranjeria:  ' + this.state.user.nroDocument + '             Estado Civil: ' + this.state.user.civilState, 30, 200)
        doc.text('Domicilio: ' + this.state.user.address, 30, 220)
        doc.text('Distrito: ' + this.state.user.districtAddress, 30, 240)
        doc.text('A quien en adelante se le denominará EL AFILIADO. ', 30, 260)
        doc.text('Co-Afiliado ', 30, 280)
        doc.text('Nombres y Apellidos: ', 30, 300)
        doc.text('DNI: ', 30, 320)
        doc.text('El presente contrato de prestación de servicios, se celebra bajo los siguientes términos y condiciones:', 30, 345)

        doc.setFont('Arial');
        doc.setFontSize(10);
        doc.text('PRIMERO: OBJETO.       ', 30, 370)
        doc.text('En virtud del presente contrato, EL PRESTADOR suministra a EL AFILIADO, los SERVICIOS descritos en el Plan de Beneficios', 30, 390)
        doc.text('de KEOLA NETWORKS SAA, Aplicativo Móbil de la propiedad del PRESTADOR, adicionalmente abre la posibilidad de ', 30, 400)
        doc.text('Participación accionarial de KEOLA NETWORKS SAA, segun las condiciones establecidas en la Cláusula Sexto: Acciones, de', 30, 410)
        doc.text('acuerdo con el tipo de membresía seleccionada.', 30, 420)

        doc.text('Membresía: CLASIC ____          GOLD   ____         PLATINIUM   ____       INFINITE   _X_  ', 30, 440)

        doc.text('SEGUNDO: DURACIÓN.       ', 30, 460)
        doc.text('La prestacion de servicios, brindada por el presente contrato tendrá una duración DE 1 AÑO, iniciando el 01/01/2021 hasta', 30, 480)
        doc.text('el 31/12/2021 fecha pactada con EL AFILIADO, el PRESTADOR, no se hace responsable por el tiempo que EL AFILIADO no haga', 30, 490)
        doc.text('uso del beneficio, durante la vigencia de la Membresía.', 30, 500)

        doc.text('TERCERO: VALOR Y FORMA DE PAGO.     ', 30, 520)
        doc.text('EL AFILIADO se obliga a realizar el pago de la membresía escogida al momento de suscribirse al presente contrato valor de UN', 30, 540)
        doc.text('MIL CIENTO SETENTA CON 00/100.- Dolares ( 1,170.00 USD ). Este pago le confiere el derecho al uso de los servicios de ', 30, 550)
        doc.text('KEOLA NETWORKS SAA, descritos en el Plan de Beneficios, bajo los términos y condiciones establecidas en el presente documento.', 30, 560)

        doc.text('CUARTO: FINANCIAMIENTO. ', 30, 580)
        doc.text('El AFILIADO podrá realizar el financiamiento del valor de su membresía en: ', 30, 600)
        doc.text('Al Contado____                                      9 Cuotas Cada cuota de ____', 100, 620)
        doc.text('3 Cuotas Cada cuota de ____                  12 Cuotas Cada cuota de 90 USD  ____', 100, 640)
        doc.text('6 Cuotas Cada cuota de ____                   Otros  ____ ', 100, 660)
        doc.text('El Pago de La Cuota Inicial , se realiza al suscribirse el presente contrato y las cuotas se pagarán según cronograma adjunto.', 30, 680)
        doc.text('- Cuenta Corriente Soles           BCP 191-2606708-0-82', 100, 695)
        doc.text('- Cuenta Corriente Dolares         BCP 191-2616687-1-90 ', 100, 705)
        doc.text('En el caso de incumplimiento del cronograma de pagos, EL AFILIADO, tendrá las siguientes alternativas', 30, 720)
        doc.text('1.- Suspensión de los beneficios (según Plan de Beneficios ANEXO 1) y además al pago de moras y penalidades como sigue:', 30, 740)
        doc.text('a) Atraso de UNA (1) CUOTA y (2) CUOTAS MENSUALES, 1% de la cuota mensual, por día de atraso.', 60, 750)
        doc.text('b) Atraso de TRES (3) CUOTAS MENSUALES, se procederá a la disolución del presente contrato y aplicar a Liquidación.', 60, 760)
        doc.text('2.- Aplicar a liquidación, donde se devuelve al 100% el dinero en servicios que brinda el Aplicativo ( Paquetes Publicitarios para.', 30, 770)
        doc.text('Personas y/o empresas).', 30, 780)
        doc.text('3.- Realizar un traspaso de la membresía a un Tercero.', 30, 790)
        
        doc.addPage();
        doc.text('QUINTO: PLAN DE POSICIONAMIENTO.', 30, 50)
        doc.text('EL AFILIADO se compromete con la compañía a ayudar con el posicionamiento del aplicativo móvil, haciendo ello atraves de la', 30, 70)
        doc.text('invitación gratuita de usuarios y comercios, quienes puedan usar las funcionalidades y beneficios del aplicativo totalmente gratis', 30, 80)
        doc.text('contribuyendo así al posicionamiento del aplicativo. En virtud de ello, recibe el precio promocional, indicado en el Artículo', 30, 90)
        doc.text('TERCERO: Valor y Forma de Pago, el cual corresponde al 50% su valor valor real.', 30, 100)
        doc.text('5.1. Cuota de Posicionamiento según Tipo de Membresia: Clasic: 33 usuarios y 2 Comercios; Gold: 100 usuarios y 6 Comercios; y', 30, 110)
        doc.text('Platinium: 200 usuarios y 12 Comercios. Todos usuarios Gratuitos, eso si 100% verificados y con documento de identidad único.', 30, 120)
        doc.text('5.2. En el caso que EL AFILIADO, no pueda lograr el numero de usuarios y comercios gratuitos establecido según su tipo de', 30, 130)
        doc.text('contrato se procederán de las 2 siguientes maneras:', 30, 140)
        doc.text('5.2.1. Hacer el pago correspondiente proporcionalmente por la cantidad de usuarios y comercios pendientes. En donde el costo', 50, 150)
        doc.text('por cada usuario y comercio pendiente será el siguiente: usuario: USD $ 1.5 comercio USD $ 7.5, con dicho monto, el área', 50, 160)
        doc.text('comercial de la compañía se hará carga y la vez mostrara fehacientemente al socio el cumplimiento de la atracción de dichos usuarios.', 50, 170)
        doc.text('5.2.2. Recibir acciones correspondientes al 25% de lo ofrecido originalmente por la membresia adquirida.', 50, 180)

        doc.text('SEXTO: UPGRADES.', 30, 200)
        doc.text('EL PRESTADOR asegura disponibilidad de membresía para UPGRADES. Teniendo en consideración las siguientes condiciones:', 30, 220)
        doc.text('6.1. El Precio del UPGRADE, será de acuerdo a las tasas vigentes en el momento. ', 30, 240)
        doc.text('6.2. El afiliado durante los primeros 60 días puede migrar entre membresías, desde la CLASIC hasta la PLATINIUM. Para lo cual', 30, 250)
        doc.text('lo que habrá de pagar es la diferencia del valor entre las membresías más la tasa de UPGRADE (COSTO DE MIGRACION DE', 30, 260)
        doc.text('MEMBRESIA) vigente en el momento.', 30, 270)
        doc.text('6.3. El número de membresías será determinado en función a la cantidad total de acciones disponibles', 30, 280)

        doc.text('SETIMO: OPCION A PARTICIPACION DE ACCIONES.', 30, 300)
        doc.text('7.1. El Prestador, indica la creación de una nueva Razón Social: KEOLA NETWORKS SAA, empresa donde se constituirán los socios', 30, 320)
        doc.text('del Aplicativo KEOLA NETWORKS, hoy propiedad de el PRESTADOR. ', 30, 330)
        doc.text('7.2. Al cumplimiento del pago del 100% del valor de la membresía adquirida, la cual debe haber sido pagada cumpliendo las', 30, 340)
        doc.text('fechas de pago.Se Otorgara a EL AFILIADO un Certificado de Acciones Vitalicias, según corresponda el tipo de membresía adquirida.', 30, 350)
        doc.text('7.3. La entrega del Certificado de Acciones Vitalicias, se realizará a la fecha del cumplimiento de pago de la Membresía.', 30, 360)
        doc.text('En el caso de Membresías. Dichos certificados, serán legalizados Notarialmente. Y serán inscritos en Registros Públicos a la', 30, 370)
        doc.text('fecha de la colocación total de las acciones de KEOLA NETWORKS SAA', 30, 380)
        doc.text('7.4. El número de acciones correspondientes varían según el tipo de membresía adquirida:', 30, 390)
        doc.text('Membresía: CLASIC ( 1,500)       GOLD (5,000)       PLATINIUM (10,000)        INFINITE(30,000)', 50, 410)
        doc.text('7.5. El AFILIADO declara y acepta, conocer que el incumplimiento de pago al 100% del contrato de prestación de servicios y/o el', 30, 430)
        doc.text('incumplimiento de pago puntual según fecha; le quitan el derecho de posesión de las acciones según correspondieran. Así como', 30, 440)
        doc.text('también, los beneficios sujetos a cualquier campaña promocional aplicable.', 30, 450)
        doc.text('7.6. KEOLA NETWORKS SAA, se constituirá con 2,500,000,000 acciones, de las cuales serán puestas a disposición de los socios del', 30, 460)
        doc.text('Sistema de Membresías el 40% de las mismas, los socios tendrán derecho a una participación de las utilidades de KEOLA', 30, 470)
        doc.text('NETWORKS directamente proporcional al número de acciones adquiridas.', 30, 480)

        doc.text('OCTAVO: DERECHOS DEL USUARIO.', 30, 500)
        doc.text('8.1. Identificación. A las 48 horas de realizado el pago de la cuota de ingreso, se actualizará en sistema al AFILIADO. ', 30, 520)
        doc.text('8.2. Kit de Bienvenida. Cada AFILIADO, después de formalizar su sistema de pago, recibe el Kit en un plazo de 15 días útiles.', 30, 530)
        doc.text('El Kit incluye: Carta de Bienvenida donde se condigna su número de afiliado, Cronograma de Pagos (caso hubiese fraccionado),', 30, 540)
        doc.text('Estatutos y Reglamento de KEOLA NETWORKS Este Kit de Bienvenida únicamente será entregado en alguna de nuestras oficinas', 30, 550)
        doc.text('previa coordinación con el titular o vía correo electrónico según prefiera EL AFILIADO.', 30, 560)
        doc.text('8.3. Acciones. Al cumplimiento del pago del 100% del valor de la membresía adquirida, la cual debe haber sido pagada cumpliendo', 30, 570)
        doc.text('las fechas de pago. Harán acreedor a EL AFILIADO de un Certificado de Acciones Vitalicias, según corresponda el tipo de', 30, 580)
        doc.text('membresía adquirida. Esta entrega se realizara a la fecha de la colocación total de las acciones de KEOLA NETWORKS SAA.', 30, 590)
        doc.text('8.4. Desacuerdo Varios: Todos los AFILIADOS tendrán derecho a revocar el contrato durante el primer año, de no estar de acuerdo', 30, 600)
        doc.text('con los avances del desarrollo, su administracion, o cualquier situation por la cual no desee seguir formando parte de KEOLA', 30, 610)
        doc.text('NETWORKS como Socio. Ante lo cual la empresa, les devolvera el 100% de sus aportes en servicios de publicidad dentro del', 30, 620)
        doc.text('aplicativo de Keola Networks, y dejar sin efecto este contrato.', 30, 630)

        doc.text('NOVENO: OBLIGACIONES DEL USUARIO.', 30, 650)
        doc.text('9.1. EL AFILIADO reconoce que el PRESTADOR a través de su administración podrá imponer a los afiliados las sanciones que', 30, 670)
        doc.text('constan en el Reglamento de KEOLA NETWORKS.', 30, 680)
        doc.text('9.2. EL AFILIADO declara conocer las disposiciones contenidas en el Reglamento de KEOLA NETWORKS y que lo ha leído', 30, 690)
        doc.text('previamente leído previamente a la suscripción del presente documento, sin más constancia que la firma puesta al pie,', 30, 700)
        doc.text('quedando suscrito a sus términos y condiciones aceptando los procedimientos y sanciones que éste contempla.', 30, 710)
        doc.text('9.3. EL AFILIADO declara y acepta que el PRESTADOR podrá modificar su Reglamento, así como podrá otras normas, reglamentos', 30, 720)
        doc.text('y políticas que tengan por finalidad mejorar las condiciones para los afiliados y público en general, los cuales están obligados a', 30, 730)
        doc.text('respetarlas desde la fecha en que estas sean comunicadas.', 30, 740)
        doc.text('9.4. Acciones. EL AFILIADO declara y acepta conocer que el incumplimiento de pago al 100% del contrato de prestación de servicios', 30, 750)
        doc.text('y/o el incumplimiento de pago puntual según fecha; le quitan el derecho de posesión de las acciones que le correspondieran.', 30, 760)

        doc.text('DECIMO: TERMINACIÓN.', 30, 780)
        doc.text('Este contrato queda resuelto de manera automática una vez finalizado el periodo de la membresía contratado. En caso de', 30, 800)
        doc.text('incumplimiento de cualquier obligación del presente contrato y del Reglamento por parte de EL AFILIADO, El Prestador podrá', 30, 810)
        doc.text('resolverlo de manera automática y sin lugar a devolución de dinero.', 30, 820)

        doc.addPage();
        doc.text('DECIMO PRIMERO: CESIÓN.', 30, 50)
        doc.text('EL AFILIADO puede ceder, transferir o donar, parcial o totalmente cualquier servicio y/u obligaciones bajo este contrato, ', 30, 70)
        doc.text('con el solo llenado de los formatos correspondientes.', 30, 80)

        doc.text('DECIMO SEGUNDO: RESOLUCIÓN UNILATERAL.', 30, 100)
        doc.text('Podrán resolver unilateralmente el contrato, mediante una comunicación por escrito y bajo cargo de entrega, dentro de los cinco', 30, 120)
        doc.text('(5) días calendarios siguiente suscrito el contrato; para lo cual no es necesaria una expresión de causa, con lo cual acepta', 30, 130)
        doc.text('pagar el 55% del valor total de la membresía adquirida (correspondiente a los gastos de ventas y administrativos al igual como se', 30, 140)
        doc.text('indica en la cláusula cuarta en caso de financiamiento), por concepto de penalidad, devolviéndose el saldo en el caso que lo', 30, 150)
        doc.text('hubiera, en un plazo no menor de 45 días ni mayor de 60 días, sin que se genere ningún tipo de interés compensatorio o moratorio', 30, 160)
        doc.text('ni de cualquier tipo. La devolución total procederá en el caso que la autoridad competente disponga en los plazos indicados previa', 30, 170)
        doc.text('demostración objetiva y fehaciente por parte de EL AFILIADO según lo previsto en el articulo N° 59 de la ley N°29571.', 30, 180)
       
        doc.text('DECIMO TERCERO: NORMAS ADICIONALES.', 30, 200)
        doc.text('El Prestador, se reserva el derecho a modificar, adicionar y/o complementar normas. Todas estas modificaciones adicionales y', 30, 220)
        doc.text('demás estarán en vigor al día siguiente de su publicación. El incumplimiento de las mismas dará lugar a la cancelación de los', 30, 230)
        doc.text('derechos de EL AFILIADO, como también en los casos en que comportamiento sea considerado molesto, perturbador, inmoral o,', 30, 240)
        doc.text('fraudulento sin derecho a devolución del monto pagado.', 30, 250)

        doc.text('DECIMO CUARTO: MANEJO DE DATOS PERSONALES.', 30, 270)
        doc.text('EL AFILIADO, autoriza a el PRESTADOR, el uso de los datos consignados en el presente contrato para fines de comunicación y', 30, 290)
        doc.text('promoción de los productos y servicios que éste ofrece.', 30, 300)

        
        doc.text('DECIMO QUINTO: ESTIPULACIONES ANTERIORES.', 30, 320)
        doc.text('Las partes contratantes manifiestan que el presente contrato constituye un acuerdo completo y total acerca de su objeto y reemplaza', 30, 340)
        doc.text('cualquier otro acuerdo verbal o escrito celebrado con anterioridad. ', 30, 350)
        doc.text('Para constancia se firma en dos (2) ejemplares del mismo tenor, el día 24/06/2020', 30, 370)
        doc.text('_________________________                                           ____________________________', 60, 420)
        doc.text('        EL AFILIADO                                                                         DIRECTOR', 60, 430)
        doc.text('Nombres y Apellidos:', 30, 465)
        doc.text(this.state.user.name +  this.state.user.lastname , 30, 480)



        doc.save("CON" + this.state.user.username + ".pdf")
    }

    getRegister = () => {
        // console.log("hola");
        // Get by id
        let packages = [
            {
                id: 1,
                type: "Certificado",
            },
            {
                id: 2,
                period: "Contrato",
            },

        ]

        let tags = <tr></tr>;
        if (packages.length > 0) {
            tags = packages.map((item, idx) => (
                <tr>
                    <td>{item.period}</td>
                    <td>
                        <Button variant="info" size="sm" onClick={this.jsPdfGenerator}>Ver Documento</Button>
                    </td>
                    <td>
                        <Button variant="info" size="sm" onClick={this.jsPdfGenerator2}>Ver Documento</Button>
                    </td>
                </tr>
            ));

        }

        return tags;
    }


    render() {
        return (
            <div style={{ padding: 30 }}>
                <Table>
                    <thead className="table-head">
                        <tr>
                            <th>Tipo de Documento</th>
                            <th></th>
                        </tr>
                    </thead>
                  
                    <tbody>
                        <tr>
                            <td>Certificado</td>
                            <td>
                                <Button variant="info" size="sm" onClick={this.jsPdfGenerator}>Ver Documento</Button>
                            </td>
                        </tr>
                        <tr>
                            <td>Contrato</td>
                            <td>
                                <Button variant="info" size="sm" onClick={this.jsPdfGenerator2}>Ver Documento</Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>

            </div>
        );
    }
}