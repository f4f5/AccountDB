# AccountDB

AccountDB连接着本地的数据库保存用户的私钥信息，所以，AccountDB也负责对交易进行签名然后连接到Nodeos。总的来说，AccountDB需要与Webserver交互、与Nodeos交互，还与本地connector交互。私钥保存方式是把私钥截断，并与很多无效数据进行混淆。只有webserver提供了可靠的信息，才能从浩如烟海的数据堆中拼凑出正确的私钥。因此，对AccountDB的攻击是无效的。

