---
layout: page
title: Express uygulamaları için Süreç yöneticileri
menu: advanced
lang: tr
redirect_from: "/advanced/pm.html"
---

# Express uygulamaları için Süreç yöneticileri

{% include community-caveat.html %}

Canlı ortam için Express uygulamaları koştuğunuzda aşağıdaki nedenlerden ötürü bir _süreç yöneticisi_ kullanmak faydalı olacaktır:

- Uygulama patladığında otomatik olarak tekrar başlatmak.
- Çalışma zamanı performansı ve kaynak tüketimi hakkında daha iyi bilgiler elde edinmek.
- Performansı iyileştirmek için ayarları dinamik olarak değiştirmek.
- Kümelemeyi (clustering) kontrol etmek.

Süreç yöneticisi, bir nevi bir uygulama sunucusuna benzer: dağıtımı kolaylaştıran, yüksek kullanılabilirlik sağlayan ve uygulamayı çalışma zamanında (runtime) yönetmenizi sağlayan, uygulamalar için bir "kapsayıcı" (container)dır.

Express ve diğer Node.js uygulamaları için en popüler süreç yöneticileri şunlardır:

- **[Forever](https://github.com/foreverjs/forever){: target="_blank"}**: Bir komut dosyasının sürekli (sonsuza kadar) çalışmasını sağlamak için basit bir komut satırı arayüzü aracı. Forever'ın basit arayüzü, Node.js uygulamalarının ve komut dosyalarının küçük dağıtımlarını çalıştırmak için idealdir.
- **[PM2](https://github.com/Unitech/pm2){: target="_blank"}**: Gömülü bir yük dengeleyiciye (load balancer) sahip, Node.js uygulamaları için bir canlı ortam süreç yöneticisi. PM2, uygulamaları sonsuza kadar canlı tutmanıza olanak tanır, kesinti olmadan yeniden yükler, loglamayı, izleme (monitoring) ve kümelemeyi yönetmenize yardımcı olur.
- **[StrongLoop Process Manager (Strong-PM)](http://strong-pm.io/)**: Gömülü yük dengeleme (load balancer), izleme (monitoring) ve çoklu dağıtıma özelliklerine sahip, Node.js uygulamaları için bir canlı ortam süreç yöneticisi. Node.js uygulamalarını oluşturmak (build), paketlemek ve yerel (local) veya uzak bir sisteme dağıtmak için bir CLI içerir.
- **SystemD**: Modern Linux dağıtımlarındaki varsayılan süreç yöneticisi, bir Node uygulamasının servis olarak çalıştırılmasını kolaylaştırır. Daha fazla bilgi için bakınız ["Run node.js service with systemd" by Ralph Slooten (@axllent)](https://www.axllent.org/docs/view/nodejs-service-with-systemd/).
