import { Link, useSearchParams } from 'react-router-dom';
import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { getStyleImage } from '../../../../helpers/backgroundImage';
import { sizeOfImage } from '../../../../helpers/checkImages';

//
function Contact() {
    return (
        <>
            <section class="contact spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div class="contact__widget">
                                <span class="icon_phone"></span>
                                <h4>Điện thoại</h4>
                                <p>+84 389 619 050</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div class="contact__widget">
                                <span class="icon_pin_alt"></span>
                                <h4>Địa chỉ</h4>
                                <p>Số 30 Ngõ 134, Nguyên Xá, Từ Liêm, Hà Nội</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div class="contact__widget">
                                <span class="icon_clock_alt"></span>
                                <h4>Mở cửa</h4>
                                <p>10:00 giờ đến 23:00 giờ</p>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div class="contact__widget">
                                <span class="icon_mail_alt"></span>
                                <h4>Email</h4>
                                <p>sp.yeucongnghe@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="map container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d398.054211967683!2d105.7391850795842!3d21.05137212966787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454f70ab05253%3A0xec095abc235f9569!2zTmcuIDEzNCDEkCwgQ-G6p3UgRGnhu4VuLCBOZ3V5w6puIFjDoSwgTWluaCBLaGFpLCBC4bqvYyBU4burIExpw6ptLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1652521284627!5m2!1svi!2s"
                    height="500"
                    style={{ border: 0 }}
                    allowfullscreen=""
                    aria-hidden="false"
                    tabindex="0"
                    title="Bản đồ"
                ></iframe>
                <div class="map-inside">
                    <i class="icon_pin"></i>
                    <div class="inside-widget">
                        <h4>Yêu công nghệ</h4>
                        <ul>
                            <li>Phone: +84 389 619 050</li>
                            <li>Add: 30 Ngõ 134, Nguyên Xá, Từ Liêm, Hà Nội</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="contact-form spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="contact__form__title">
                                <h2>Để lại lời nhắn</h2>
                            </div>
                        </div>
                    </div>
                    <form onsubmit="addMessage(event)">
                        <div class="row">
                            <div class="col-lg-6 col-md-6">
                                <input id="name" type="text" placeholder="Họ &amp; Tên" />
                            </div>
                            <div class="col-lg-6 col-md-6">
                                <input id="email" type="email" placeholder="Email" />
                            </div>
                            <div class="col-lg-12 text-center">
                                <textarea id="message" placeholder="Lời nhắn"></textarea>
                                <button type="submit" class="site-btn">
                                    Gửi
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default memo(Contact);
