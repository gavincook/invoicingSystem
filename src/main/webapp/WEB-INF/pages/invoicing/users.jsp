<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../common/header.jsp" %>
<!DOCTYPE html>
<html>
<head>
	<title>用户管理</title>
	<script src="assets/js/jquery.dataTables.min.js"></script>
	<script src="assets/js/jquery.dataTables.bootstrap.js"></script>
</head>

<body>
	<div class="row">
		<div class="col-xs-12">
			<h3 class="header smaller lighter blue">jQuery dataTables</h3>
			<div class="table-header">Results for "Latest Registered
				Domains"</div>
		
			<div class="table-responsive">
				<table id="example" class="display" cellspacing="0" width="100%">
        <thead>
        </tbody>
    </table>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		$(document).ready(function() {
			$('#example').dataTable({
				ajax:contextPath+"/user/getUsersData",
				"columns": [
				            { "data": "name" },
				            { "data": "position" },
				            { "data": "office" },
				            { "data": "extn" },
				            { "data": "start_date" },
				            { "data": "salary" }
				        ]
			});
		});
	</script>
</body>

</html>