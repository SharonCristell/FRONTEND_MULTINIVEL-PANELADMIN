import React from 'react';
import { Form, Table, Button, Modal, Row } from 'react-bootstrap';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactTable from "react-table";

import logoKeOla from '../../images/KeOla.png';
import logoInClub from '../../images/navologo.png';

import jsPDF from "jspdf";
import "jspdf-autotable";

import Pagination from '../../components/utils/Pagination';

export default class DocumentView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            discountPlan: [
                { benefits: "Articulos en la tienda Keola", free: "0%", classic: "10%", gold: "20%", platinum: "30%", infinite: "40%" },
            ],

            personalAccount: [
                { benefits: "DURACION", free: "30", classic: "30", gold: "30", platinum: "30", infinite: "30" },
                { benefits: "RENOVACION AUTOMATICA", free: "NO", classic: "SI", gold: "SI", platinum: "30", infinite: "SI" },
                { benefits: "UBICACION LISTADOS", free: "INFERIOR", classic: "MEDIA 2°", gold: "MEDIA 1°", platinum: "SUPERIOR 2°", infinite: "SUPERIOR 1°" },
                { benefits: "ROTACION DE IMÁGENES", free: "NO", classic: "NO", gold: "SI", platinum: "30", infinite: "SI" },
                { benefits: "DESTAQUE EN LISTADO", free: "NO", classic: "NO", gold: "NO", platinum: "30", infinite: "SI" },
                { benefits: "LIBRE DE PUBLICIDAD", free: "NO", classic: "SI", gold: "SI", platinum: "30", infinite: "SI" },
                { benefits: "CARGO DE VENTA", free: "GRATIS", classic: "GRATIS", gold: "GRATIS", platinum: "GRATIS", infinite: "GRATIS" },
                { benefits: "CANTIDAD DE ANUNCIOS Y/O ARTICULOS EN PARALELO", free: "1", classic: "5", gold: "10", platinum: "15", infinite: "30" },
            ],

            businessAccount: [
                { benefits: "CANTIDAD TIENDAS", free: "1", classic: "1", gold: "2", platinum: "3", infinite: "5" },
                { benefits: "UBICACION LISTADOS", free: "INFERIOR", classic: "MEDIA 2°", gold: "MEDIA 1°", platinum: "SUPERIOR 2°", infinite: "SUPERIOR 1°" },
                { benefits: "REPOSTERÍA", free: "NO", classic: "SI", gold: "SI", platinum: "SI", infinite: "SI" },
                { benefits: "INTEGRACIÓN TIENDA ONLINE PROPIA", free: "NO", classic: "NO", gold: "NO", platinum: "NO", infinite: "SI" },
                { benefits: "LIBRE DE PUBLICIDAD", free: "NO", classic: "SI", gold: "SI", platinum: "SI", infinite: "SI" },
                { benefits: "CANTIDAD DE PRODUCTOS CATALOGO", free: "25", classic: "50", gold: "100", platinum: "ILIMITADO", infinite: "ILIMITADO" },
                { benefits: "CARGO DE VENTA", free: "GRATIS", classic: "GRATIS", gold: "GRATIS", platinum: "GRATIS", infinite: "GRATIS" },
            ],

            affiliation: [

                { membershipType: "CLASSIC", type1: "EXPERIENCE", type2: "LIGHT", type3: "STANDARD" },
                { membershipType: "GOLD", type1: "STANDARD", type2: "VITALICIA", type3: "VITALICIA" },
                { membershipType: "PLATINUM", type1: "VITALICIA", type2: "VITALICIA", type3: "VITALICIA" },
                { membershipType: "INFINITE", type1: "VITALICIA", type2: "", type3: "" },
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
                nroTelf: ""
            },
            userMod: {

            },
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
                nroTelf: user.nroTelf
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
        var width = doc.internal.pageSize.width;
        var height = doc.internal.pageSize.height;


        doc.setFontSize(15);

        const title = "PLAN DE DESCUENTOS";
        const headers = [["BENEFICIOS", "GRATUITA", "CLASIC", "GOLD", "PLATINIUM", "INFINITE"]];

        const data = this.state.discountPlan.map(elt => [elt.benefits, elt.free, elt.classic, elt.gold, elt.platinum, elt.infinite]);

        let content = {
            startY: 505,
            head: headers,
            body: data
        };

        const title2 = "CUENTA PUBLICITARIA PERSONAL";
        //const headers2 = [["BENEFICIOS", "GRATUITA","CLASIC", "GOLD","PLATINIUM"]];

        const data2 = this.state.personalAccount.map(elt => [elt.benefits, elt.free, elt.classic, elt.gold, elt.platinum, elt.infinite]);
        let content2 = {
            startY: 585,
            head: headers,
            body: data2
        };

        const title3 = "CUENTA PUBLICITARIA NEGOCIOS";


        const data3 = this.state.businessAccount.map(elt => [elt.benefits, elt.free, elt.classic, elt.gold, elt.platinum, elt.infinite]);
        let content3 = {
            startY: 50,
            head: headers,
            body: data3
        };

        const title4 = "Tabla de Afiliacion InResorts (Beneficio de duplicacion de Acciones Keola)";

        const headers4 = [["TIPO DE MEMBRESIA", "1 Membresia", "2 Membresias", "3 Membresias"]];

        const data4 = this.state.affiliation.map(elt => [elt.membershipType, elt.type1, elt.type2, elt.type3]);

        let content4 = {
            startY: 280,
            head: headers4,
            body: data4
        };

        doc.addImage(logoInClub, 430, 30, 120, 70);

        doc.addImage(logoKeOla, 220, 70, 140, 100);

        doc.setFontSize(16);
        doc.text('                                    ACLARA:                ', 90, 190)
        doc.setFont('Arial');
        doc.setFontSize(16);
        doc.text('Que el contrato ' + this.state.user.username + ' a nombre del Sr.(a) ' + this.state.user.name + " " + this.state.user.lastname + " ", 60, 220)
        doc.text('identificado con DNI ' + this.state.user.nroDocument + ' podrá hacer uso de los beneficios de su', 60, 235)
        doc.text('membresía EXPERIENCE una vez cancelado el valor de la cuota inicial,', 60, 250)
        doc.text('según sus especificaciones de su contrato.', 60, 265)

        doc.setFont('Arial');
        doc.setFontSize(14);
        doc.text('Activa sus beneficios según los plazos indicados en contrato de la siguiente manera:', 60, 295)
        doc.text('        - Plan Descuentos: 20% hasta 40% en la Tienda Keola ', 60, 320)
        doc.text('        - Plan Publicitario: Personal y Negocios PLATINIUM ', 60, 335)
        doc.text('        - En caso de hacerse socio de un Desarrollo Hotelero de inResorts, durante el', 60, 350)
        doc.text('          primer año, se DUPLICARIAN las acciones adquiridas de Keola según la Tabla', 60, 365)
        doc.text('          de afiliación a inResorts adjunta en este documento.', 60, 380)

        doc.text('                                               ----------------------------------         ', 60, 440)
        doc.addImage(logoInClub, 260, 435, 70, 45);
        doc.setFontSize(8);
        doc.text('                                                                      RUC: 20601460271                    ', 125, 485)

        doc.setFont('Arial');
        doc.setFontSize(14);
        doc.text(title, marginLeft, 495);
        doc.autoTable(content);
        doc.setFontSize(14);
        doc.text(title2, marginLeft, 575);
        doc.autoTable(content2);
        doc.setFont('Arial');
        doc.setFontSize(10);
        doc.text('* Duracion de uso de paquete mensual', 40, 820)

        doc.addPage();



        doc.setFont('Arial');
        doc.setFontSize(14);
        doc.text(title3, marginLeft, 40);

        doc.autoTable(content3);

        doc.setFont('Arial');
        doc.setFontSize(10);
        doc.text('* Duracion de uso de paquete 1 mes', 40, 240)

        doc.setFont('Arial');
        doc.setFontSize(14);
        doc.text(title4, marginLeft, 270);

        doc.autoTable(content4);
        doc.setFontSize(10);
        doc.text('CORREOS: servicioalcliente@keola.club o pagos@keola.club', 170, 410);
        doc.text('pagos@keola.club', 250, 425);
        doc.setFont('Arial');


        doc.save("CER" + this.state.user.username + ".pdf")
    }




    getRegister = () => {
        // console.log("hola");
        // Get by id
        let packages = [
            {
                id: 1,
                period: "Certificado",
                update: "24/07/2020",
                comission: 44.25
            },
            {
                id: 2,
                period: "Contrato",
                update: "24/07/2020",
                comission: 44.25
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