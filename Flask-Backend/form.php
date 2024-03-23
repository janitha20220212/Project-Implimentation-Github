<?php if(isset($_POST["contactsName"]))
{
	// Read the form values
	$success = false;
	$name = isset( $_POST['contactsName'] ) ? preg_replace( "/[^\s\S\.\-\_\@a-zA-Z0-9]/", "", $_POST['contactsName'] ) : "";
	$service = isset( $_POST['contactsServiceValue'] ) ? preg_replace( "/[^\s\S\.\-\_\@a-zA-Z0-9]/", "", $_POST['contactsServiceValue'] ) : "";
	$date = isset( $_POST['contactsDateValue'] ) ? preg_replace( "/[^\s\S\.\-\_\@a-zA-Z0-9]/", "", $_POST['contactsDateValue'] ) : "";
	$senderTel = isset( $_POST['contactsTel'] ) ? preg_replace( "/[^\s\S\.\-\_\@a-zA-Z0-9]/", "", $_POST['contactsTel'] ) : "";
	$message = isset( $_POST['contactsMessage'] ) ? preg_replace( "/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['contactsMessage'] ) : "";

	//Headers
	$to = "name@domain.com";
    $subject = 'Contact Us';
	$headers = "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";

	//body message
	$message = "Name: ". $name . "<br>Phone: ". $senderTel . "<br>Service: ". $service . "<br>Date: ". $date . "<br> Message: " . $message . "";

	//Email Send Function
    $send_email = mail($to, $subject, $message, $headers);
}
else
{
	echo '<div class="failed">Failed: Email not Sent.</div>';
}
?>