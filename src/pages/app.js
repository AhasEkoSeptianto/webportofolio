import { Component, Fragment } from "react";
import "./../css/app.css";
import anime from "animejs/lib/anime.es.js";
import Axios from "axios";
import ReactPlayer from "react-player";

class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            db: [],
            isLoading: true,
        };
    }

    async componentDidMount() {
        document.title = "my applications";
        document.body.style = "background-color:#2B2B2B;";

        // connecsi api express dan ambil database duluan
        await Axios.get(`https://api-websie-portofolio.herokuapp.com/api`)
            .then((res) => {
                this.setState({ db: res.data.application, isLoading: false });
            })
            .catch((e) => console.log(e));

        // navigation pada saat scrool jauh kebawah
        window.addEventListener("scroll", this.listenToScroll);

        // perlihatkan project paling awal terlebih dahulu
        document
            .getElementById("0")
            .setAttribute("style", "opacity:1;margin: 140px 0px 100px 0px;");
    }

    // function untuk menghandel semua animasi yang berjalan
    // pada scrool
    listenToScroll = () => {
        var top = document.documentElement.scrollTop; // mengambil variable scrool top
        console.log(top);
        // transisi ketika user scrool kebawah maka tombol kecil dibawah akan membantu user ketika ingin
        // kembali halaman ( navbar / top )dengan cepat
        var autoTop = document.getElementById("nav-top");
        if (top > 2000) {
            autoTop.setAttribute("style", "opacity:1;height:50px;");
        } else {
            autoTop.setAttribute("style", "opacity:0");
        }

        // logika ketika dapat databases dari backend lalu menampilkannya dalam bentuk looping
        // karena dengan looping akan menghemat line codingan
        // akan menampilkan beberapa list ketika user berada ditempat scrool yang telah diset pembuat
        // ketika user keluar dari batasan scrool yang dibuat maka list akan dihilangkan
        var rangeApplicationTop = 10;
        var rangeApplicationBot = 300;
        if (window.innerWidth < 600) {
            for (let i = 0; i < this.state.db.length; i++) {
                if (top > rangeApplicationTop) {
                    if (
                        top > rangeApplicationTop &&
                        top < rangeApplicationBot
                    ) {
                        var app = document.getElementById(i);
                        app.setAttribute(
                            "style",
                            "opacity:1;margin: 20px 0px 20px 0px;"
                        );
                        break;
                    } else {
                        rangeApplicationTop += 750;
                        rangeApplicationBot += 800;
                    }
                }
            }
        } else {
            for (let i = 0; i < this.state.db.length; i++) {
                if (top > rangeApplicationTop) {
                    if (
                        top > rangeApplicationTop &&
                        top < rangeApplicationBot
                    ) {
                        var app = document.getElementById(i);
                        app.setAttribute(
                            "style",
                            "opacity:1;margin: 140px 0px 100px 0px;"
                        );
                        break;
                    } else {
                        rangeApplicationTop += 550;
                        rangeApplicationBot += 590;
                    }
                }
            }
        }
    };

    render() {
        return (
            <Fragment>
                <div className="container-nav-about" id="navbar">
                    <a href="/">
                        <div className="navbar-about-bg">
                            <h3>Home</h3>
                        </div>
                    </a>
                </div>
                {/* application list */}
                {this.state.isLoading ? (
                    <div className="Loading">
                        <p className="text_loading">Fetching Api..</p>
                    </div>
                ) : (
                    <Fragment>
                        <div className="container-my-app" id="container-app">
                            {this.state.db.map((data, index) => {
                                if (window.innerWidth < 600) {
                                    return (
                                        <div
                                            className="row row-aplications"
                                            id={index}
                                        >
                                            <div className="col-sm image-aplications">
                                                <ReactPlayer
                                                    url={data.image}
                                                    playing={false}
                                                    autoPlay={false}
                                                    loop={true}
                                                    controls={true}
                                                    width="100%"
                                                />
                                            </div>
                                            <div className="col-sm deksripsi-applications">
                                                <h5>{data.deksripsi}</h5>
                                                <a
                                                    href={data.download}
                                                    download
                                                >
                                                    <button className="btn btn-primary mt-3">
                                                        {data.button}
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    );
                                } else if (index % 2 !== 0) {
                                    return (
                                        <div
                                            className="row row-aplications"
                                            id={index}
                                        >
                                            <div className="col-sm image-aplications">
                                                <ReactPlayer
                                                    url={data.image}
                                                    playing={false}
                                                    autoPlay={false}
                                                    loop={true}
                                                    controls={true}
                                                    width="100%"
                                                />
                                            </div>
                                            <div className="col-sm deksripsi-applications">
                                                <h5>{data.deksripsi}</h5>
                                                <a
                                                    href={data.download}
                                                    download
                                                >
                                                    <button className="btn btn-primary mt-3">
                                                        {data.button}
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div
                                            className="row row-aplications"
                                            id={index}
                                        >
                                            <div className="col-sm deksripsi-applications">
                                                <h5>{data.deksripsi}</h5>
                                                <a
                                                    href={data.download}
                                                    download
                                                >
                                                    <button className="btn btn-primary mt-3">
                                                        {data.button}
                                                    </button>
                                                </a>
                                            </div>
                                            <div className="col-sm image-aplications">
                                                <ReactPlayer
                                                    url={data.image}
                                                    playing={false}
                                                    autoPlay={false}
                                                    loop={true}
                                                    controls={true}
                                                    width="100%"
                                                />
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>

                        <div className="nav-container">
                            <div
                                className="container-image-nav fixed-bottom"
                                id="nav-top"
                            >
                                <a href="#navbar" className="">
                                    <img
                                        src={"./../image/arrow.png"}
                                        width="30px"
                                        alt="-"
                                    />
                                </a>
                            </div>
                        </div>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

export default app;
