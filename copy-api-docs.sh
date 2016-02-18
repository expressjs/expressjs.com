git clone https://github.com/expressjs/express.git
rm _includes/api/en/4x/*.md
cp ./express/doc/*.md _includes/api/en/4x
sed -i.bak 's/~~~js/{% highlight js %}/g' _includes/api/en/4x/*.md
sed -i.bak 's/~~~/{% endhighlight %}/g' _includes/api/en/4x/*.md
rm _includes/api/en/4x/*.bak

