<?php
require 'sendmail/class.phpmailer.php';
require_once("sendmail/class.pop3.php"); // required for POP before SMTP

function sendmail($name, $email) {
	$company_name = $_POST["company_name"];
	$representative = $_POST["representative"];
	$tel = $_POST["tel"];
	$email = $_POST["email"];
	$content = $_POST["content"];
	//$sitetype = $_POST["sitetype"];
	$message = '氏名'.$representative.'様'.'<br/>'.
			'この度はお問い合わせいただき、誠にありがとうございました。'.'<br/>'.
			'担当者より折り返しご連絡いたしますので、今しばらくお待ちください。'.'<br/><br/>'.
			'数日経っても連絡がない場合は、大変お手数ですが、'.'<br/>'.
			'お電話またはメールフォームより再度お問い合わせください。'.'<br/><br/>'.
			'この度はお問い合わせいただき、ありがとうございました。重ねて御礼申し上げます。'.'<br/>'.
			'ーーーーーーーーーーーーーーーーーー'.'<br/><br/>'.
			'会社名： '.$company_name.'<br/>'.
			'ご担当者名： '.$representative.' 様'.'<br/>'.
			'電話番号： '.$tel.'<br/>'.
			'メールアドレス： '.$email.'<br/>'.
			//'希望サイト： '.$sitetype.'<br/>'.
			'詳細： '.$content.'<br/><br/>'.
			'ーーーーーーーーーーーーーーーーーー'.'<br/><br/>';

		$mail = new PHPMailer();
		$mail->IsSMTP();
		$mail->CharSet="UTF-8";
		$mail->SMTPSecure = 'tls';
		$mail->Host = 'smtp.gmail.com';
		$mail->Port = 587;
		$mail->Username = 'beetcoding@gmail.com';
		$mail->Password = 'Beetservice12345';
		$mail->SMTPAuth = true;

		$mail -> From = 'service@beetsoft.com.vn';
		$mail -> FromName = 'BeetCodingサービス';
		$mail -> addAddress($email);
		$mail->addBCC('linh.nguyen@beetsoft.com.vn');
		$mail->addBCC('anhpn2@beetsoft.com.vn');
		$mail->addBCC('misaki@beetsoft.com.vn');
		$mail->addBCC('taikimori@beetsoft.com.vn');
		$mail->addBCC('sotamuneoka@beetsoft.com.vn');

		$mail -> isHTML(true);
		// Set email format to HTML

		$mail -> Subject = 'お問い合わせありがとうございます/BEET CODING';
		$mail -> Body = $message;
		$result=0;	
		if (!$mail -> send()) {
			$result = 'NG';
		} else {
			$result = 'OK';
		}
		echo $result;
		return $result;
}

$email = $_POST["email"];
$username = $_POST["representative"];
sendmail($username,'contact@beetsoft.com.vn');

?>