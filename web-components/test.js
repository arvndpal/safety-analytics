//Check if page is in Design Mode (ie Site Actions > Edit Page). If so, inDesignMode will be "1"
var inDesignMode =
  document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;

/* 	--------------
		  GLOBAL VARS
		--------------  */

var allRequestColumns;
var requestDetails;
var inputTitle;
var titleString;
var rowAssignedTo;
var divAssignedTo;
var editorAssignedTo;
var hiddenAssignedTo;
var userAssignedTo;
var selectDecision;
var selectStatus;
var selectRequestId;
var textareaComments;
var rowCompletedBy;
var divCompletedBy;
var editorCompletedBy;
var hiddenCompletedBy;
var selectTrackerId;
var selectStage;
var inputRole;
var buttonSave;
var buttonCancel;
var buttonApprove;
var buttonReject;
var PrioToMeApprove;
var msFormToolbar;
var currentUser;
var owners;
var currentItemId;
var inputWorkflowInstance;
var NextApproverRole;
var region1;
var vertical1;
var firstapproverroles;
var secondapproverroles;
var NextApproverRoleID;
var allApproverRoles;
var rowBackupApproverTo;
var divBackupApproverTo;
var editorBackupApproverTo;
var hiddenBackupApproverTo;
var entity;
var salespersonName;
var backupapprovername;
var rowCurrentAssignedtaskBackupApprover;
var PriorApprover;
var PriorApproverName;
var PriorApproverNameTo;
var PriorApproverTo;
var editorPriorApproverTo;
var hiddenPriorApproverTo;
var objectString;
var allApproverOutOfOffice;
var PriorToApproverAction;
var OrignalapproverID;
var buttonPrioToMeApprove;
var ProductArray;
var rowPriorApproverName;
var divPriorApproverName;
var editorPriorApproverName;
var hiddenPriorApproverName;
var CommentstoNextApprover;
var rowCurrentTaskBackupApproverTo;
var divCurrentTaskBackupApproverTo;
var editorBackupApproverTo;
var hiddenCurrentTaskBackupApproverTo;
var allApprovaltask;
var counter;
var NumberOfApprovalSkip;
var roles_Split;
var SkipApproverLog;
var rowNextapprover;
var divNextApprover;
var editorNextApprover;
var hiddenNextApprover;
var spPeoplePickerNextaPPROVER;
var backupspPeoplePicker;
var attachments;
var allApproverdetails;

/* 	--------------
		  FUNCTIONS
		--------------  */

function restCall(url, successFunction, passedWithSuccess) {
  //console.log(url);

  var call = $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    headers: {
      Accept: 'application/json;odata=verbose',
    },
  });
  call.done(function (data, textStatus, jqXHR) {
    // console.log(data);
    if (data.d.results) {
      successFunction(data.d.results, passedWithSuccess);
    } else {
      successFunction(data.d, passedWithSuccess);
    }
  });
  call.fail(function (jqXHR, textStatus, errorThrown) {
    console.log('Error retrieving information via REST call');
    console.log(jqXHR);
    console.log(textStatus);
    console.log(errorThrown);
  });
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function formatTimeWithAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = ('0' + minutes).slice(-2);
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

//Get Current User object
function getCurrentUser() {
  var url = _spPageContextInfo.webAbsoluteUrl + '/_api/web/CurrentUser';
  restCall(url, setCurrentUser);
}
function setCurrentUser(results) {
  currentUser = results;
  //console.log('inside setCurrentUser');
  //console.log(currentUser);
}

function getBackUpApprover() {
  var url =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/getbytitle('Requests')/items(" +
    selectRequestId.val() +
    ')?$select=BackUPApprover/Title,BackUPApprover/EMail&$expand=BackUPApprover';
  restCall(url, setBackUpApproverDetails);
}

function setBackUpApproverDetails(results) {
  backupapprovername = results;
  //console.log("backupapprovername",backupapprovername)
}
//Get MPS Finance DOA Business Owners
function getOwners() {
  var url =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/SiteGroups/getByName('MPS Finance DOA Business Owners')/Users";
  restCall(url, setOwners);
}
function setOwners(results) {
  owners = results;
  //console.log('inside setOwners');
}

//Check if Current User is AssignedTo or DOA Business Owner
function checkAssignedTo() {
  //getBackUpApprover();
  //console.log('inside checkAssignedTo');
  var authorized = false;
  var baackapproveremail = '';
  userAssignedTo = JSON.parse(hiddenAssignedTo.val())[0];
  if (hiddenCurrentTaskBackupApproverTo.val() != '') {
    baackapproveremail = JSON.parse(hiddenCurrentTaskBackupApproverTo.val())[0]
      .DisplayText;
  }
  console.log('baackapproveremail' + baackapproveremail);
  //debugger;
  /*if(backupapprovername != undefined){
	baackapproveremail = backupapprovername.BackUPApprover.EMail;
	}*/
  //console.log("baackapproveremail",baackapproveremail)
  if (
    currentUser.LoginName === userAssignedTo.Key ||
    _spPageContextInfo.userDisplayName == baackapproveremail
  ) {
    authorized = true;
  } else {
    owners.forEach(function (owner) {
      if (currentUser.LoginName === owner.LoginName) {
        authorized = true;
      }
    });
  }

  if (authorized) {
    //console.log('currentUser is authorized');
    rowAssignedTo.find('td.ms-formbody').text(userAssignedTo.DisplayText);
    loadForm();
  } else {
    currentUrl = window.location.href.toLowerCase();
    redirectUrl = currentUrl.replace('editform.aspx', 'dispform.aspx');
    console.error('current user is not authorized!!! redirecting');
    window.location = redirectUrl;
  }
}

function setCompletedByAsCurrentUser() {
  var spPeoplePicker =
    SPClientPeoplePicker.SPClientPeoplePickerDict[divCompletedBy[0].id];
  editorCompletedBy.val(currentUser.LoginName);
  spPeoplePicker.AddUnresolvedUserFromEditor(true);
}

//FORM TEMPLATE
function getFormTemplate(templateId) {
  var url =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/getbytitle('LU-Form Templates')/items(" +
    templateId +
    ')';
  restCall(url, setFormTemplate);
}
function setFormTemplate(results) {
  console.log('inside setFormTemplate');
  //console.log(results);
  var nonStandardFields = results.NonStandardFields;
  if (nonStandardFields != '' && nonStandardFields != null) {
    var nonStandardFields = results.NonStandardFields.split(', ');
    var nonStandardFieldsHTML = '';
    nonStandardFields.forEach(function (field) {
      //console.log(field,':', requestDetails[field]);

      nonStandardColumn = allRequestColumns.filter(function (column) {
        return column.StaticName === field ? true : false;
      })[0];

      var fieldString = requestDetails[field];
      if (
        requestDetails[field] === null ||
        requestDetails[field] === undefined
      ) {
        fieldString = '';
      } else if (
        nonStandardColumn.TypeAsString === 'Number' &&
        nonStandardColumn.ShowAsPercentage === true
      ) {
        fieldString =
          fieldString === null ? '' : (fieldString * 100).toString() + ' %';
      } else if (nonStandardColumn.TypeAsString === 'DateTime') {
        var d = new Date(fieldString);
        if (nonStandardColumn.DisplayFormat === 0) {
          fieldString =
            d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
        } else {
          var timeString = formatTimeWithAMPM(d);
          fieldString =
            d.getMonth() +
            1 +
            '/' +
            d.getDate() +
            '/' +
            d.getFullYear() +
            ' ' +
            timeString;
        }
      } else if (nonStandardColumn.TypeAsString === 'Currency') {
        fieldString = '$' + parseFloat(fieldString).toFixed(2).toString();
      } else if (nonStandardColumn.TypeAsString === 'User') {
        if (requestDetails[field].Title != undefined) {
          fieldString = requestDetails[field].Title.toString();
        } else {
          fieldString = '';
        }
      } else if (nonStandardColumn.TypeAsString === 'MultiChoice') {
        fieldString = requestDetails[field].results.join('; ');
      } else if (nonStandardColumn.TypeAsString === 'UserMulti') {
        fieldString = requestDetails[field].results
          .map(function (user) {
            return user.Title;
          })
          .join('; ');
      } else if (nonStandardColumn.TypeAsString === 'Lookup') {
        /*fieldString = requestDetails[field].results.map(function(selection){
				return selection.Title;
			}).join('; ');*/
        fieldString = requestDetails[field].Title.toString();
      } else if (nonStandardColumn.TypeAsString === 'Boolean') {
        fieldString = requestDetails[field] === true ? 'Yes' : 'No';
      }

      fieldString = fieldString !== null ? fieldString : '';

      //console.log(fieldString);
      nonStandardFieldsHTML +=
        '\
		<tr class="request-details-row">\
		<td width="100%" class="ms-formlabel" nowrap="true" valign="top">\
		<div class="row">\
			<label class="col-25 col-form-label fw-bold label-hd-bg"><span class="ms-h3 ms-standardheader"><nobr>' +
        nonStandardColumn.Title +
        '</nobr></span></label>\
			<div class="col-75 col-form-label label-dis-bg">\
			  <span dir="none">' +
        fieldString +
        '</a></span>\
			</div>\
		  </div>\
		</td>\
	</tr>';
    });
    //console.log(nonStandardFieldsHTML);
    $('#NonStandardFieldsPlaceholder').after(nonStandardFieldsHTML);
    $('tr.request-details-row').show();
    //showRevenueContractFields();
  }
}

function showRevenueContractFields() {
  //console.log('inside showRevenueContractFields');
  //console.log(requestDetails.FormTemplateId);
  //console.log(inputRole.val());
  if (
    requestDetails.FormTemplateId == 7 &&
    inputRole.val() === 'MPS Segment Controller'
  ) {
    //console.log('should be showing special Revenue Contract fields')
    $('#MpsEntityId').closest('tr').show();
    $('#MultipleElementArrangement').closest('tr').show();
    $('#EquipmentLeaseType').closest('tr').show();
    $('#CapitalizedContractCosts').closest('tr').show();
    $('#FinancingOffered').closest('tr').show();
    $('#AccountingTreatment').closest('tr').show();
    $('#DateContractReviewed').closest('tr').show();
    $('#ContractReviewedBy').closest('tr').show();
  }
}

function loadForm() {
  //getApprovalTasks();

  if (selectStatus.val() == 'Pending') {
    getRequestDetails();
    setCompletedByAsCurrentUser();
    buttonSave.hide();
    rowAssignedTo.find('span[title="This is a required field."]').remove();
    rowAssignedTo.show();
    rowBackupApproverTo.show();
    //textareaComments.closest('td').append('<span id="CommentsRequired">Comments are required on rejection.</span>');
    textareaComments.closest('tr').show();
    CommentstoNextApprover.closest('tr').show();
    textareaComments
      .closest('td')
      .append(
        '<span id="CommentsRequired">Comments are required on rejection. </br><span class="ApproverMessage">These comments stay with the request and are visible to all approvers. Please use this Comments box for critical information and information to be seen by later approvers to help make a decision.</span></span>'
      );

    CommentstoNextApprover.closest('td').append(
      '<span class="ApproverMessage">This is an email note ONLY for the next approver, Type any important note for all approvers in the previous Comments box (not here).</span>'
    );
    //$("</br><span class='ApproverMessage'>Note for next approver’s email only</span>").insertAfter(CommentstoNextApprover.closest('tr').find('td nobr')[0])
    //rowCurrentAssignedtaskBackupApprover.closest('tr').show();
    rowRole = inputRole.closest('tr');
    inputRole.closest('span').text(inputRole.val());
    rowRole.show();
    msFormToolbar.show();
    PriorApprover.closest('tr').show();
    attachments.closest('tr').show();
    //attachments.closest('tr')[0].setAttribute("style", "display:-webkit-inline-box")
    attachments
      .closest('tr')
      .find('td')[1]
      .setAttribute('style', 'display:revert');
    attachments.closest('tr').find('td')[0].setAttribute('style', 'width:100%');
  } else {
    var redirectUrl = window.location.href
      .toLowerCase()
      .replace('editform', 'dispform');
    window.location = redirectUrl;
  }
}

//REQUEST DETAILS
function getRequestDetails() {
  var url =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/getbytitle('Requests')/items(" +
    selectRequestId.val() +
    ')?$select=*,Author/Title,TransactionCategory/Title,Segment/Title,Vertical/Title,Region/Title,EntityName/Title,SalesManName/Title,SalesManName/Name,BusinessManager/Title,SalesManager/Title,BackUPApprover/Title,BackUPApprover/EMail,Currency/Title&$expand=Author,TransactionCategory,Segment,Vertical,Region,EntityName,SalesManName,SalesManager,BusinessManager,BackUPApprover,Currency';
  restCall(url, setRequestDetails);
}

function setRequestDetails(results) {
  console.log('inside setRequestDetails');
  console.log('results', results);
  requestDetails = results;
  region1 = results.Region.Title;
  entity = results.EntityName.Title;
  vertical1 = results.Vertical.Title;
  firstapproverroles = results.FirstApproverRoles;
  secondapproverroles = results.SecondApproverRoles;
  salespersonName = results.SalesManName.Name;
  objectString = JSON.parse(results.ObjectString);
  ProductArray = results.ProductJSONData;
  var businessreasons =
    results.BusinessReason == null ? '' : results.BusinessReason;
  //console.log("objectString",JSON.parse(results.ObjectString))

  var formTableBody = $('table.ms-formtable > tbody');
  var createdDate = new Date(results.Created);
  var m = parseInt(createdDate.getMonth()) + 1;
  var d = createdDate.getDate();
  var yyyy = createdDate.getFullYear();
  var requestoremail =
    results.RequestorEmail == null
      ? results.Author.Title
      : results.RequestorEmail;
  var titleData = results.Title == null ? 'OTC Application' : results.Title;

  var requestHTML =
    '\
	<tr class="request-details-row">\
		<td colspan="2">\
		<h2 class="mb-3">REQUEST DETAILS</h2>\
		</td>\
	</tr>\
	<tr class="request-details-row">\
		<td width="100%" class="ms-formlabel" nowrap="true" valign="top">\
		<div class="row">\
			<label class="col-25 col-form-label fw-bold label-hd-bg"><span class="ms-h3 ms-standardheader"><nobr>Request Name</nobr></span></label>\
			<div class="col-75 col-form-label label-dis-bg">\
			  <span dir="none">' +
    titleData +
    '</a></span>\
			</div>\
		  </div>\
		</td>\
	</tr>\
	<tr class="request-details-row">\
		<td width="100%" class="ms-formlabel" nowrap="true" valign="top">\
		<div class="row">\
			<label class="col-25 col-form-label fw-bold label-hd-bg"><span class="ms-h3 ms-standardheader"><nobr>Created By</nobr></span></label>\
			<div class="col-75 col-form-label label-dis-bg">\
			<span dir="none">' +
    requestoremail +
    '</a></span>\
		</div>\
		  </div>\
		</td>\
	</tr>\
	<tr class="request-details-row">\
		<td width="100%" class="ms-formlabel" nowrap="true" valign="top">\
		<div class="row">\
			<label class="col-25 col-form-label fw-bold label-hd-bg"><span class="ms-h3 ms-standardheader"><nobr>Created</nobr></span></label>\
		   <div class="col-75 col-form-label label-dis-bg">\
			<span dir="none">' +
    m +
    '/' +
    d +
    '/' +
    yyyy +
    ' ' +
    createdDate.toLocaleTimeString('en-US') +
    '</a></span>\
		</div>\
		  </div>\
		</td>\
	</tr>\
	<tr class="request-details-row">\
		<td width="100%" class="ms-formlabel" nowrap="true" valign="top">\
		<div class="row">\
			<label class="col-25 col-form-label fw-bold label-hd-bg"><span class="ms-h3 ms-standardheader"><nobr>Segment</nobr></span></label>\
		<div class="col-75 col-form-label label-dis-bg">\
			<span dir="none">' +
    results.Segment.Title +
    '</span>\
		</div>\
		  </div>\
		</td>\
	</tr>\
	<tr class="request-details-row">\
		<td width="100%" class="ms-formlabel" nowrap="true" valign="top">\
		<div class="row">\
			<label class="col-25 col-form-label fw-bold label-hd-bg"><span class="ms-h3 ms-standardheader"><nobr>BU/Function</nobr></span></label>\
		<div class="col-75 col-form-label label-dis-bg">\
			<span dir="none">' +
    results.Vertical.Title +
    '</span>\
		</div>\
		  </div>\
		</td>\
	</tr>\
	<tr class="request-details-row">\
		<td width="100%" class="ms-formlabel" nowrap="true" valign="top">\
		<div class="row">\
			<label class="col-25 col-form-label fw-bold label-hd-bg"><span class="ms-h3 ms-standardheader"><nobr>Region</nobr></span></label>\
		<div class="col-75 col-form-label label-dis-bg">\
			<span dir="none">' +
    results.Region.Title +
    '</span>\
		</div>\
		  </div>\
		</td>\
	</tr>\
	<tr class="request-details-row">\
		<td width="100%" class="ms-formlabel" nowrap="true" valign="top">\
		<div class="row">\
			<label class="col-25 col-form-label fw-bold label-hd-bg"><span class="ms-h3 ms-standardheader"><nobr>Transaction Category</nobr></span></label>\
		<div class="col-75 col-form-label label-dis-bg">\
			<span dir="none">' +
    results.TransactionCategory.Title +
    '</span>\
		</div>\
		  </div>\
		</td>\
	</tr>\
	<tr class="request-details-row">\
		<td width="100%" class="ms-formlabel" nowrap="true" valign="top">\
		<div class="row">\
			<label class="col-25 col-form-label fw-bold label-hd-bg"><span class="ms-h3 ms-standardheader"><nobr>Transaction Currency</nobr></span></label>\
		<div class="col-75 col-form-label label-dis-bg">\
			<span dir="none">' +
    results.Currency.Title +
    '</span>\
		</div>\
		  </div>\
		</td>\
	</tr>\
	<tr class="request-details-row">\
		<td width="100%" class="ms-formlabel" nowrap="true" valign="top">\
		<div class="row">\
			<label class="col-25 col-form-label fw-bold label-hd-bg"><span class="ms-h3 ms-standardheader"><nobr>Amount In Invoicing Currency <span class="txtsmall">(Net amount excluding tax)</span></nobr></span></label>\
		<div class="col-75 col-form-label label-dis-bg">\
			<span dir="none">' +
    results.AmountInLocalCurrency.toLocaleString() +
    '</span>\
		</div>\
		  </div>\
		</td>\
	</tr>\
	<tr class="request-details-row">\
		<td width="100%" class="ms-formlabel" nowrap="true" valign="top">\
		<div class="row">\
			<label class="col-25 col-form-label fw-bold label-hd-bg"><span class="ms-h3 ms-standardheader"><nobr>Amount in USD<span class="txtsmall">(Calculated amount based on today’s exchange rate)</span></nobr></span></label>\
		<div class="col-75 col-form-label label-dis-bg">\
			<span dir="none">' +
    results.RequestedAmount.toLocaleString() +
    '$</span>\
		</div>\
		  </div>\
		</td>\
	</tr>\
	<tr class="request-details-row">\
		<td width="100%" class="ms-formlabel" nowrap="true" valign="top">\
		<div class="row">\
			<label class="col-25 col-form-label fw-bold label-hd-bg"><span class="ms-h3 ms-standardheader"><nobr>Customer Name</nobr></span></label>\
		<div class="col-75 col-form-label label-dis-bg">\
			<span dir="none">' +
    results.CustomerName +
    '</span>\
		</div>\
		  </div>\
		</td>\
	</tr>\
	<tr class="request-details-row">\
		<td width="100%" class="ms-formlabel" nowrap="true" valign="top">\
		<div class="row">\
			<label class="col-25 col-form-label fw-bold label-hd-bg"><span class="ms-h3 ms-standardheader"><nobr>Salesperson or Requestor Name</nobr></span></label>\
		<div class="col-75 col-form-label label-dis-bg">\
			<span dir="none">' +
    results.SalesManName.Title +
    '</span>\
		</div>\
		  </div>\
		</td>\
	</tr>\
	<tr class="request-details-row">\
		<td width="100%" class="ms-formlabel" nowrap="true" valign="top">\
		<div class="row">\
			<label class="col-25 col-form-label fw-bold label-hd-bg"><span class="ms-h3 ms-standardheader"><nobr>Entity Number</nobr></span></label>\
		<div class="col-75 col-form-label label-dis-bg">\
			<span dir="none">' +
    results.EntityCode +
    '</span>\
		</div>\
		  </div>\
		</td>\
	</tr>\
	<tr class="request-details-row">\
		<td width="100%" class="ms-formlabel" nowrap="true" valign="top">\
		<div class="row">\
			<label class="col-25 col-form-label fw-bold label-hd-bg"><span class="ms-h3 ms-standardheader"><nobr>Entity Name</nobr></span></label>\
		<div class="col-75 col-form-label label-dis-bg">\
			<span dir="none">' +
    results.EntityName.Title +
    '</span>\
		</div>\
		  </div>\
		</td>\
	</tr>\
	<tr id="NonStandardFieldsPlaceholder">\
	</tr>\
	<tr class="request-details-row">\
		<td width="100%" class="ms-formlabel" nowrap="true" valign="top">\
		<div class="row">\
			<label class="col-25 col-form-label fw-bold label-hd-bg"><span class="ms-h3 ms-standardheader"><nobr>Business Reason</nobr></span></label>\
		<div class="col-75 col-form-label label-dis-bg">\
			<span dir="none">' +
    businessreasons +
    '</span>\
		</div>\
		  </div>\
		</td>\
	</tr>\
	<tr id="attachmentsRow" class="request-details-row">\
	</tr>\
	<tr class="request-details-row" id="producttabel">\
	\
	<td id="productSelectTable" colspan="2">\
       <h2 class="mb-3">\
	<span id="prdTableHeading">Products / Items</span>\
	</h2>\
	</td>\
	</tr>\
	<tr class="request-details-row" id="lastrowofPreviousApproval">\
	<td colspan="2" id="approvalRouteTable">\
	<h2 class="mb-3">\
	<span id="approverRouteheading">APPROVAL ROUTE FOR THIS REQUEST</span>\
	</h2>\
	<div class="aaproval-route-box">\
	<table class="customTable" style="display:none"><thead><tr><th>Role</th><th>Approver Name</th> <th>Backup Approver</th> </tr> </thead> <tbody id=Approverscontainer></tbody></table>\
	<div>\
	</td>\
	</tr>\
	<tr class="request-details-row">\
		<td colspan="2" id="sepratorApprovalRoute"><hr style="border-top:1px solid black !important"></td>\
	</tr>\
	<tr class="request-details-row">\
		<td colspan="2";>\
		<h2 class="mb-3">PREVIOUS APPROVALS<h2>\
		</td>\
	</tr>\
	<tr class="request-details-row">\
		<td colspan="2" class="sepratorline"><div class="prev-approval-container"><p class="p-text fw-bolder margn-btm-20">Prior Approval indicates that this additional approver was added to the workflow using the ‘add approver before me’ feature. <br/>Highlighted name indicates that the approver is a backup.</p></div></td>\
	</tr>\
	<tr class="request-details-row">\
		<td colspan="99" nowrap="true" valign="top">\
			<table id="TaskDetailsTable">\
			</table>\
		</td>\
	</tr>\
	<tr class="request-details-row">\
		<td colspan="2" class="sepratorline"><hr style="border-top:1px solid black !important"></td>\
	</tr>\
	<tr class="request-details-row">\
		<td colspan="2";>\
		<h2 class="mb-3">REQUEST APPROVAL TASK<h2>\
		<div class="prev-approval-container"><p class="p-text fw-bolder">Review the request details above, then Approve or Reject the request</p><ul><li>If Approving: enter comments (optional), then click the Approve button</li> <li>If Rejecting: enter comments for the requestor, then click the Reject button (the requestor will be notified and will have the ability to re-submit without losing their work)</li></ul></div><div style="margin-bottom: 10px;"><h2 class="mb-3">My Approval<h2></div></td>\
	</tr>';

  formTableBody.prepend(requestHTML);
  if (results.Attachments === true) {
    getRequestAttachments();
  }
  $('tr.request-details-row').show();
  var productSelectTable = $('#productSelectTable');
  var producttable = $('#producttable');
  $(productSelectTable).append(producttable);
  $('table#producttable').css('display', 'block');
  UpdatDetailsONProductList();
  //getTasksCreatedforRequest();
  getApprovalTasks();
  createApprovalRoute(results.ObjectString);
  getRequestColumns();
  getNextApproverRole();
  if (PriorApprover.is(':checked') == false) {
    //getNextApprover();
    //getNextApproverDetails()
  }

  // getFormTemplate(results.FormTemplateId);
}

function UpdatDetailsONProductList() {
  var objectstringval = JSON.parse(ProductArray);
  console.log('objectstringval', objectstringval);
  if (objectstringval != null && objectstringval.length > 0) {
    for (var i = 0; i < objectstringval.length; i++) {
      var j = i + 1;
      $('input[id=Description' + j + ']').val(objectstringval[i].Description);
      $('input[id=Quantity-' + j + ']').val(objectstringval[i].Quantity);
      $('input[id=BaseUOM' + j + ']').val(objectstringval[i].BaseUOM);
      $('input[id=Plant' + j + ']').val(objectstringval[i].Plant);
      $('input[id=Price' + j + ']').val(objectstringval[i].Price);
      $('input[id=ExtendedPrice' + j + ']').val(
        objectstringval[i].ExtendedPrice
      );
      $('input[id=item-' + j + ']').val(objectstringval[i].itemNumber);
    }
    var sum = 0;
    $("input[id^= 'ExtendedPrice']").each(function () {
      sum += +$(this).val();
    });
    $("input[id='TotalPrice']").val(sum);
  } else {
    $('table#producttable').css('display', 'none');
    $('#prdTableHeading').css('display', 'none');
    $('#prdTableSeprator').css('display', 'none');
  }
  //filterProduct();
}

//Load all columns from Requests list
function getRequestColumns() {
  var url =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/getbytitle('Requests')/fields?$filter=(Hidden eq false) and (ReadOnlyField eq false)&$select=*";
  restCall(url, setRequestColumns);
}
function setRequestColumns(results) {
  //console.log('inside setRequestColumns');
  //console.log(results);
  allRequestColumns = results;
  getFormTemplate(requestDetails.FormTemplateId);
}

/*
//PREVIOUS APPROVALS
function getTasksCreatedforRequest(){
	var requestid = $("#RequestID").closest('tr').find('select').val();
	var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Approval Tasks')/items?$select=*,AssignedTo/Title,AssignedTo/EMail,AssignedTo/Name,CompletedBy/Title,Role/Title&$expand=AssignedTo,CompletedBy,Role&$filter=(RequestID eq '"+ requestid +"') and (Decision ne 'Rejected')&orderby=ID asc&$top=5000";
	restCall(url, setApprovalRequest);
}
function setApprovalRequest(results){
	allApprovaltask = results;
}

*/

//PREVIOUS APPROVALS
function getApprovalTasks(results) {
  var requestid = $('#RequestID').closest('tr').find('select').val();
  //var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Approval Tasks')/items?$select=*,AssignedTo/Title,AssignedTo/EMail,AssignedTo/Name,CompletedBy/Title,Role/Title&$expand=AssignedTo,CompletedBy,Role&$filter=(Status eq 'Completed') and (RequestID eq '"+ requestid +"')&orderby=ID asc&$top=5000";
  var url =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/getbytitle('Approval Tasks')/items?$select=*,AssignedTo/Title,AssignedTo/EMail,AssignedTo/Name,CompletedBy/Title,Role/Title&$expand=AssignedTo,CompletedBy,Role&$filter=(RequestID eq '" +
    requestid +
    "')&orderby=ID asc&$top=5000";
  restCall(url, setApprovalTasks);
}
function setApprovalTasks(results) {
  allApprovaltask = results;
  var allApprovaltasktable = results.filter(function (col) {
    return col.Status === 'Completed';
  });
  console.log('inside setApprovalTasks', allApprovaltasktable);
  var resultsHTML = '';
  if (allApprovaltasktable.length === 0) {
    resultsHTML =
      '\
		<tr id="forfirstapproval" class="task-details-row">\
			<td class="task-details-none" colspan="99">\
				You are the first Approver of this request.\
			</td>\
		</tr>\
		';
  } else {
    resultsHTML +=
      '\
			<thead>\
				<th>Assigned To</th>\
				<th>Role</th>\
				<th>Prior Approval</th>\
				<th>Completed By</th>\
				<th>Completed Date/Time</th>\
				<th>Outcome</th>\
				<th>Comments</th>\
				<th>Next Approver Comments</th>\
			</thead>\
			<tbody>';

    allApprovaltasktable.forEach(function (task) {
      var assignedTo =
        task.AssignedTo.Title !== null ? task.AssignedTo.Title : '';
      var role = task.Role.Title !== null ? task.Role.Title : '';
      var completedBy =
        task.CompletedBy.Title !== undefined ? task.CompletedBy.Title : '';
      var completedByClass =
        assignedTo === completedBy || completedBy === ''
          ? 'task-details-completedby'
          : 'task-details-completedby yellow-bg';
      var outcome = task.Decision !== null ? task.Decision : 'Pending';
      var outcomeClass =
        outcome === 'Approved'
          ? 'task-details-outcome green-text'
          : outcome === 'Rejected'
          ? 'task-details-outcome red-text'
          : 'task-details-outcome';
      var comments = task.Comments !== null ? task.Comments : '';
      var CommentstoNextApprover =
        task.CommentstoNextApprover !== null ? task.CommentstoNextApprover : '';
      var PriorApproval =
        task.PriorApproverAction == 'Send Email' ? 'Yes' : 'No';

      resultsHTML +=
        '\
			<tr class="task-details-row">\
				<td class="task-details-assignedto">\
					' +
        assignedTo +
        '\
				</td>\
				<td class="task-details-role">\
					' +
        role +
        '\
				</td>\
				<td class="task-details-role">\
					' +
        PriorApproval +
        '\
				</td>\
				<td class="' +
        completedByClass +
        '">\
					' +
        completedBy +
        '\
				</td>\
				<td class="task-details-role">\
					' +
        task.Modified +
        '\
				</td>\
				<td class="' +
        outcomeClass +
        '">\
					' +
        outcome +
        '\
				</td>\
				<td class="task-details-comments">\
					' +
        comments +
        '\
				</td>\
				<td class="task-details-comments">\
					' +
        CommentstoNextApprover +
        '\
				</td>\
			</tr>';
    });
    resultsHTML += '</tbody>';
  }
  $('#forfirstapproval').remove();
  $('#TaskDetailsTable').append(resultsHTML);

  //wait until jQuery has created the #TaskDetailsTable table element, then append resultsHTML
  // var checkCounter = 0;
  // var checkForTable = setInterval(function(){
  // 	console.log('inside checkForTable', checkCounter);
  // 	if($('#TaskDetailsTable').length){
  // 		$('#TaskDetailsTable').append(resultsHTML);
  // 		clearInterval(checkForTable);
  // 	} else if(checkCounter > 20){
  // 		console.log('checkCounter > 20, should clearInterval for checkForTable');
  // 		clearInterval(checkForTable);
  // 	}
  // 	checkCounter++;
  // }, 50);
}

//REQUEST ATTACHMENTS
function getRequestAttachments() {
  var url =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/getbytitle('Requests')/items(" +
    selectRequestId.val() +
    ')/AttachmentFiles';
  restCall(url, setRequestAttachments);
}
function setRequestAttachments(results) {
  console.log('inside setRequestAttachments');
  //console.log(results);
  var attachmentsHTML =
    '\
		<td class="ms-formlabel" nowrap="true" valign="top">\
			<span class="ms-h3 ms-standardheader"><nobr>Request Attachments</nobr></span>\
		</td>\
		<td width="350" class="ms-formbody" valign="top" style="border: 2px solid black;padding-left:5px"> \
		<div style="width:50px;float:left;margin:5px"><img src="https://redpostman.sharepoint.com/Finance/MPS/Approvals/DOA/SiteAssets/scripts/Images/PDF-Image.png" style="width:50px"></img></div><div style="float:left">';

  results.forEach(function (attachment) {
    attachmentsHTML +=
      '\
			<div class="attachment-item">\
				<a href="' +
      attachment.ServerRelativeUrl +
      '?web=1" target=_blank>' +
      attachment.FileName +
      '</a>\
			</div>\
		';
  });
  attachmentsHTML += '</div></td>';
  $('#attachmentsRow').append(attachmentsHTML);
  $(attachments.closest('tr')).insertBefore($('#attachmentsRow'));
}

//Create Approver/Reject buttons
function createButton(nameValue) {
  var buttonHTML =
    '\
		<td class="ms-toolbar" nowrap="nowrap">\
			<table width="100%" cellspacing="0" cellpadding="0">\
				<tbody>\
					<tr>\
						<td width="100%" align="right" nowrap="nowrap">\
							<input name="' +
    nameValue +
    '" class="ms-ButtonHeightWidth" accesskey="O" type="button" value="' +
    nameValue +
    '" target="_self">\
						</td>\
					</tr>\
				</tbody>\
			</table>\
		</td>\
		<td class="ms-separator">&nbsp;</td>';
  var separator = msFormToolbar.find('.ms-separator:first');
  $(buttonHTML).insertAfter(separator);
}

function checkforapproveButton() {
  /*if(NextSpPeoplePicker.TotalUserCount == 0){
		buttonApprove.attr('disabled', true);
	}
	else{}*/
  //alert("Hello")
  //ExecuteOrDelayUntilScriptLoaded(,'clientpeoplepicker.js')
  //checkforapproveButton();
  var rowNextApproverUsers = $('#Next_x0020_Approver').closest('tr');
  var divNextApproverUsers = rowNextApproverUsers.find(
    'div.sp-peoplepicker-topLevel'
  );
  var NextSpPeoplePicker =
    SPClientPeoplePicker.SPClientPeoplePickerDict[divNextApproverUsers[0].id];
  NextSpPeoplePicker.OnUserResolvedClientScript = function () {
    buttonApprove.attr('disabled', false);
  };
  if (NextSpPeoplePicker.TotalUserCount == 0) {
    buttonApprove.attr('disabled', true);
  }
}

function checkForRejectButton() {
  if (textareaComments.val().length === 0) {
    buttonReject.attr('disabled', true);
    $('#CommentsRequired').show();
  } else {
    buttonReject.attr('disabled', false);
    $('#CommentsRequired').hide();
  }
}

// Find the Salesman approver + 1
function getSalesmanManger(accountname) {
  var mangerclaim = '';
  var urlmanger =
    _spPageContextInfo.webAbsoluteUrl +
    '/_api/sp.userprofiles.peoplemanager/' +
    "GetPropertiesFor(AccountName=@v)?@v='" +
    encodeURIComponent(accountname) +
    "'";
  $.ajax({
    url: urlmanger,
    type: 'GET',
    headers: {
      Accept: 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
    },
    cache: false,
    async: false,
    success: function (data) {
      console.log(data);
      if (data.d != null || data.d != undefined) {
        //	console.log("MangerDetails",data.d.results)
        mangerclaim = data.d.ExtendedManagers.results;
      }
    },
    error: function (data) {
      console.log(data);
    },
  });
  return mangerclaim;
}

function getNextApproverDetails() {
  var approverrole = NextApproverRole.val();
  var filter =
    "$filter=(Regions/Title eq '" +
    region1 +
    "') and (Vertical/Title eq '" +
    vertical1 +
    "') and (EntityName/Title eq '" +
    entity +
    "')";
  var url =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/GetByTitle('LU-AUTHORIZORS')/items?$select=ApproverRole/Title,ApproverRole/ID,Regions/Title,Approver/Title,Approver/ID,Approver/Name,BackUPApprover/Title,BackUPApprover/ID,BackUPApprover/Name&$expand=BackUPApprover,ApproverRole,Regions,Approver&" +
    filter;
  restCall(url, setNextApprover);
}

function setNextApprover(results) {
  allApproverdetails = results;
  console.log('allApproverdetails', allApproverdetails);
  setApprover();
}

function setApprover() {
  console.log('allApprovaltask', allApprovaltask);
  var results = allApproverdetails.filter(function (index1) {
    return index1.ApproverRole.Title == NextApproverRole.val();
  });
  var approverrole = $("input[Title='Next Approver Role is']").val();
  var IDofRequest = 0;

  var backupapprovers = backupspPeoplePicker.GetAllUserInfo();
  backupapprovers.forEach(function (i) {
    backupspPeoplePicker.DeleteProcessedUser(backupapprovers[i]);
  });

  backupspPeoplePicker.SetEnabledState(false);
  $("a[id^='BackUPApprover']").hide();

  if (allApprovaltask != undefined) {
    var RejectedRequestArray = allApprovaltask.filter(function (index1) {
      return index1.Decision == 'Rejected';
    });
    if (RejectedRequestArray.length > 0) {
      IDofRequest = RejectedRequestArray[RejectedRequestArray.length - 1].ID;
    }
  }
  var rowCompletedBy = $('#Next_x0020_Approver').closest('tr');
  var divNextApproveBy = rowCompletedBy.find('div.sp-peoplepicker-topLevel');
  var editorCompletedBy = divNextApproveBy.children(
    'input.sp-peoplepicker-editorInput'
  );
  var hiddenCompletedBy = divNextApproveBy.children('input[type="hidden"]');
  var spPeoplePicker =
    SPClientPeoplePicker.SPClientPeoplePickerDict[divNextApproveBy[0].id];
  spPeoplePicker.SetEnabledState(false);

  var checkForInterval = setTimeout(function () {
    if (
      (NextApproverRole.val() == '[Salesperson] + 1' ||
        NextApproverRole.val() == '[Salesperson] + 1 + 1') &&
      salespersonName != undefined
    ) {
      clearTimeout(checkForInterval);
      if (NextApproverRole.val() == '[Salesperson] + 1') {
        var bkpapproveremail = objectString.filter(function (col) {
          return col.role === 'Requestor/Salesperson Manager';
        });

        var managername = getSalesmanManger(salespersonName);
        var OutOfOfficeApprovername = allApproverOutOfOffice.filter(function (
          index1
        ) {
          return index1.Who.Name == managername[managername.length - 1];
        });
        if (PriorApprover.is(':checked') == false) {
          if (OutOfOfficeApprovername.length > 0) {
            editorCompletedBy.val(OutOfOfficeApprovername[0].Backup.Name);
            if (bkpapproveremail.length > 0) {
              editorBackupApproverTo.val(bkpapproveremail[0].backupemail);
              backupspPeoplePicker.AddUnresolvedUserFromEditor(true);
              $("a[id^='BackUPApprover']").hide();
            }
          } else {
            var CheckApprvalAssigedtoUsers = allApprovaltask.filter(function (
              index1
            ) {
              return (
                index1.AssignedTo.Name == managername[managername.length - 1] &&
                index1.ID > IDofRequest
              );
            });
            if (CheckApprvalAssigedtoUsers.length == 0) {
              editorCompletedBy.val(managername[managername.length - 1]);
              if (bkpapproveremail.length > 0) {
                editorBackupApproverTo.val(bkpapproveremail[0].backupemail);
                backupspPeoplePicker.AddUnresolvedUserFromEditor(true);
                $("a[id^='BackUPApprover']").hide();
              }
            } else {
              var roleofuser;
              if (counter == 0) {
                roleofuser = $("select[Title='Role'] option:selected").text();
              } else {
                roleofuser = NextApproverRole.val();

                var logValue = SkipApproverLog.val();
                var finalstring =
                  logValue +
                  roleofuser +
                  ' has been bypassed since employee previously approved.';
                SkipApproverLog.val(finalstring);
              }

              var arrayofrole = firstapproverroles + ';' + secondapproverroles;
              var Approverroles = arrayofrole.split(';');
              var indexofrole = Approverroles.indexOf(roleofuser);

              if (
                Approverroles.length > parseInt(indexofrole) + 1 &&
                roleofuser != ''
              ) {
                var approverrolename = Approverroles[parseInt(indexofrole) + 1];
                NextApproverRole.val(approverrolename);
                var roleid = allApproverRoles.filter(function (role) {
                  return role.Title == approverrolename;
                })[0].ID;
                NextApproverRoleID.val(parseInt(roleid));
                counter++;
                setApprover();
              } else {
                NextApproverRole.val('');
                NextApproverRole.closest('tr').hide();
                rowBackupApproverTo.hide();
                rowCompletedBy.hide();
                $('#NextApprover').hide();
                $('#CommentstoNextApprover').closest('tr').hide();
              }
            }
          }
          spPeoplePicker.AddUnresolvedUserFromEditor(true);
        }
        $("a[id^='Next_x0020_Approver']").hide();
      }

      if (NextApproverRole.val() == '[Salesperson] + 1 + 1') {
        var managername = getSalesmanManger(salespersonName);
        var bkpapproveremail = objectString.filter(function (col) {
          return col.role === "Requestor/Salesperson Manager's Manager22";
        });

        var OutOfOfficeApprovername = allApproverOutOfOffice.filter(function (
          index1
        ) {
          return index1.Who.Name == managername[managername.length - 2];
        });
        if (PriorApprover.is(':checked') == false) {
          if (OutOfOfficeApprovername.length > 0) {
            editorCompletedBy.val(OutOfOfficeApprovername[0].Backup.Name);
            if (bkpapproveremail.length > 0) {
              editorBackupApproverTo.val(bkpapproveremail[0].backupemail);
              backupspPeoplePicker.AddUnresolvedUserFromEditor(true);
              $("a[id^='BackUPApprover']").hide();
            }
          } else {
            var CheckApprvalAssigedtoUsers = allApprovaltask.filter(function (
              index1
            ) {
              return (
                index1.AssignedTo.Name == managername[managername.length - 2] &&
                index1.ID > IDofRequest
              );
            });
            if (CheckApprvalAssigedtoUsers.length == 0) {
              editorCompletedBy.val(managername[managername.length - 2]);
              if (bkpapproveremail.length > 0) {
                editorBackupApproverTo.val(bkpapproveremail[0].backupemail);
                backupspPeoplePicker.AddUnresolvedUserFromEditor(true);
                $("a[id^='BackUPApprover']").hide();
              }
            } else {
              var roleofuser;
              if (counter == 0) {
                roleofuser = $("select[Title='Role'] option:selected").text();
              } else {
                roleofuser = NextApproverRole.val();

                var logValue = SkipApproverLog.val();
                var finalstring =
                  logValue +
                  roleofuser +
                  ' has been bypassed since employee previously approved.';
                SkipApproverLog.val(finalstring);
              }

              var arrayofrole = firstapproverroles + ';' + secondapproverroles;
              var Approverroles = arrayofrole.split(';');
              var indexofrole = Approverroles.indexOf(roleofuser);

              if (
                Approverroles.length > parseInt(indexofrole) + 1 &&
                roleofuser != ''
              ) {
                var approverrolename = Approverroles[parseInt(indexofrole) + 1];
                NextApproverRole.val(approverrolename);
                var roleid = allApproverRoles.filter(function (role) {
                  return role.Title == approverrolename;
                })[0].ID;
                NextApproverRoleID.val(parseInt(roleid));
                counter++;
                setApprover();
              } else {
                NextApproverRole.val('');
                NextApproverRole.closest('tr').hide();
                rowBackupApproverTo.hide();
                rowCompletedBy.hide();
                $('#NextApprover').hide();
                $('#CommentstoNextApprover').closest('tr').hide();
              }
            }
          }
          spPeoplePicker.AddUnresolvedUserFromEditor(true);
        }
        $("a[id^='Next_x0020_Approver']").hide();
      }
    } else {
      clearTimeout(checkForInterval);
      if (results.length > 0 && results[0].Approver.Name != undefined) {
        var approvername = '';
        approvername = results[0].Approver.Name;

        var CheckApprvalAssigedtoUsers = allApprovaltask.filter(function (
          index1
        ) {
          return (
            index1.AssignedTo.Name == approvername && index1.ID > IDofRequest
          );
        });
        if (CheckApprvalAssigedtoUsers.length == 0) {
          var OutOfOfficeApprovername = allApproverOutOfOffice.filter(function (
            index1
          ) {
            return index1.Who.Name == approvername;
          });
          if (PriorApprover.is(':checked') == false) {
            if (OutOfOfficeApprovername.length > 0) {
              editorCompletedBy.val(OutOfOfficeApprovername[0].Backup.Name);
            } else {
              editorCompletedBy.val(approvername);
            }
          }
        } else {
          var roleofuser;
          if (counter == 0) {
            roleofuser = $("select[Title='Role'] option:selected").text();
          } else {
            roleofuser = NextApproverRole.val();
            var logValue = SkipApproverLog.val();
            var finalstring =
              logValue +
              roleofuser +
              ' has been bypassed since employee previously approved.';
            SkipApproverLog.val(finalstring);
          }

          var arrayofrole = firstapproverroles + ';' + secondapproverroles;
          var Approverroles = arrayofrole.split(';');
          var indexofrole = Approverroles.indexOf(roleofuser);

          if (
            Approverroles.length > parseInt(indexofrole) + 1 &&
            roleofuser != ''
          ) {
            var approverrolename = Approverroles[parseInt(indexofrole) + 1];
            NextApproverRole.val(approverrolename);
            var roleid = allApproverRoles.filter(function (role) {
              return role.Title == approverrolename;
            })[0].ID;
            NextApproverRoleID.val(parseInt(roleid));
            counter++;
            setApprover();
          } else {
            NextApproverRole.val('');
            NextApproverRole.closest('tr').hide();
            rowBackupApproverTo.hide();
            rowCompletedBy.hide();
            $('#NextApprover').hide();
            $('#CommentstoNextApprover').closest('tr').hide();
          }
        }

        //editorCompletedBy.val(approvername);
        spPeoplePicker.AddUnresolvedUserFromEditor(true);
        if (backupspPeoplePicker.GetAllUserInfo().length != 0) {
          editorBackupApproverTo.val(results[0].BackUPApprover.results[0].Name);
          backupspPeoplePicker.AddUnresolvedUserFromEditor(true);
          $("a[id^='BackUPApprover']").hide();
          backupspPeoplePicker.SetEnabledState(false);
          $("a[id^='BackUPApprover']").hide();
        }
      } else {
        var approveremail = objectString.filter(function (col) {
          return col.role === NextApproverRole.val();
        });
        if (approveremail.length > 0) {
          var CheckApprvalAssiged = allApprovaltask.filter(function (index1) {
            return (
              index1.AssignedTo.EMail == approveremail[0].approveremail &&
              index1.ID > IDofRequest
            );
          });

          if (CheckApprvalAssiged.length == 0) {
            var OutOfOfficeApprovername = allApproverOutOfOffice.filter(
              function (index1) {
                return index1.Who.EMail == approveremail[0].approveremail;
              }
            );
            if (PriorApprover.is(':checked') == false) {
              if (OutOfOfficeApprovername.length > 0) {
                editorCompletedBy.val(OutOfOfficeApprovername[0].Backup.Name);
              } else {
                editorCompletedBy.val(approveremail[0].approveremail);
              }
            }
          } else {
            var roleofuser;
            if (counter == 0) {
              roleofuser = $("select[Title='Role'] option:selected").text();
            } else {
              roleofuser = NextApproverRole.val();

              var logValue = SkipApproverLog.val();
              var finalstring =
                logValue +
                roleofuser +
                ' has been bypassed since employee previously approved.';
              SkipApproverLog.val(finalstring);
            }

            var arrayofrole = firstapproverroles + ';' + secondapproverroles;
            var Approverroles = arrayofrole.split(';');
            var indexofrole = Approverroles.indexOf(roleofuser);

            if (
              Approverroles.length > parseInt(indexofrole) + 1 &&
              roleofuser != ''
            ) {
              var approverrolename = Approverroles[parseInt(indexofrole) + 1];
              NextApproverRole.val(approverrolename);
              var roleid = allApproverRoles.filter(function (role) {
                return role.Title == approverrolename;
              })[0].ID;
              NextApproverRoleID.val(parseInt(roleid));
              counter++;
              setApprover();
            } else {
              NextApproverRole.val('');
              NextApproverRole.closest('tr').hide();
              rowBackupApproverTo.hide();
              rowCompletedBy.hide();
              $('#NextApprover').hide();
              $('#CommentstoNextApprover').closest('tr').hide();
            }
          }
          //editorCompletedBy.val();
          spPeoplePicker.AddUnresolvedUserFromEditor(true);
          $("a[id^='Next_x0020_Approver']").hide();
          if (backupspPeoplePicker.GetAllUserInfo().length == 0) {
            editorBackupApproverTo.val(approveremail[0].backupemail);
            backupspPeoplePicker.AddUnresolvedUserFromEditor(true);
            $("a[id^='BackUPApprover']").hide();
          }
        }
      }
    }
  }, 100);
}

function getOutOfOfficeApprover() {
  var today = new Date();
  var hourchangedate = new Date();
  hourchangedate.setUTCHours(0, 0, 0, 0);
  //var today = new Date(new Date().setDate(new Date().getDate() - 1))
  //today.setUTCHours(0,0,0,0);
  today.toISOString();
  url =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/getbytitle('Out of Office')/items?$select=Id,Title,Who/EMail,Who/ID,Who/Name,Backup/EMail,Backup/ID,Backup/Name&$expand=Who,Backup&$filter=(Start ge datetime'" +
    today.toISOString() +
    "' and End le datetime'" +
    today.toISOString() +
    "') or (Start le datetime'" +
    today.toISOString() +
    "' and End ge datetime'" +
    today.toISOString() +
    "') or (Start eq datetime'" +
    today.toISOString() +
    "' and End eq datetime'" +
    today.toISOString() +
    "') or (Start ge datetime'" +
    hourchangedate.toISOString() +
    "' and End le datetime'" +
    today.toISOString() +
    "')&$top=5000";

  restCall(url, setAllApproverOutOfoffice);
}

function setAllApproverOutOfoffice(results) {
  allApproverOutOfOffice = results;
  console.log('allApproverOutOfOffice', allApproverOutOfOffice);
}

function getInformeename() {
  //var approverrole = $("input[Title='NextApproverRole']").val();
  var rolerow = $('#InformeeRole').closest('tr').find('input');
  var Informeerolesplit = rolerow.val().split(';');
  var rowInfomeeName = $('#InfomeeName').closest('tr');
  var divInfomeeName = rowInfomeeName.find('div.sp-peoplepicker-topLevel');
  var editorInfomeeName = divInfomeeName.children(
    'input.sp-peoplepicker-editorInput'
  );
  var hiddenInfomeeName = divInfomeeName.children('input[type="hidden"]');
  var spPeoplePickerInformee =
    SPClientPeoplePicker.SPClientPeoplePickerDict[divInfomeeName[0].id];
  var filter =
    "$filter=(Regions/Title eq '" +
    region1 +
    "') and (Vertical/Title eq '" +
    vertical1 +
    "')";
  var urls =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/GetByTitle('LU-AUTHORIZORS')/items?$select=ApproverRole/Title,ApproverRole/ID,Regions/Title,Vertical/Title,Vertical/ID,Approver/Title,Approver/ID,Approver/Name&$expand=ApproverRole,Regions,Vertical,Approver&" +
    filter;

  $.ajax({
    url: urls,
    type: 'GET',
    headers: {
      Accept: 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
    },
    cache: false,
    async: false,
    success: function (data) {
      if (data.d.results.length > 0 && Informeerolesplit.length > 0) {
        var res = data.d.results;
        Informeerolesplit.forEach(function (i) {
          Informeename = res.filter(function (index2) {
            return index2.ApproverRole.Title == i;
          });
          //[0].Approver.Name
          if (Informeename.length > 0) {
            editorInfomeeName.val(Informeename[0].Approver.Name);
            spPeoplePickerInformee.AddUnresolvedUserFromEditor(true);
          }
        });
      } else {
        //buttonApprove.attr('disabled', true);
      }
    },
    error: function (data) {
      console.log(data);
    },
  });
}

function getNextApproverRole() {
  var checkForInterval = setInterval(function () {
    clearInterval(checkForInterval);
    var roleofuser = $("select[Title='Role'] option:selected").text();
    var arrayofrole = firstapproverroles + ';' + secondapproverroles;
    var Approverroles = arrayofrole.split(';');
    var indexofrole = Approverroles.indexOf(roleofuser);
    if (Approverroles.length > parseInt(indexofrole) + 1 && roleofuser != '') {
      var approverrolename = Approverroles[parseInt(indexofrole) + 1];
      $('#NextApproverRole').closest('tr').find('input').val(approverrolename);
      var roleid = allApproverRoles.filter(function (role) {
        return role.Title == approverrolename;
      })[0].ID;
      NextApproverRoleID.val(parseInt(roleid));
    } else {
      getInformeename();
      $('#NextApproverRole').closest('tr').css('display', 'none');
      $('#CommentstoNextApprover').closest('tr').css('display', 'none');
      $('#Next_x0020_Approver').closest('tr').css('display', 'none');
      $('#BackUPApprover').closest('tr').css('display', 'none');
      $('#InformeeRole').closest('tr').css('display', 'none');
      $('#InfomeeName').closest('tr').css('display', 'none');
      var inforole = $('#InformeeRole').closest('tr').find('input');
      $('#NextApprover').css('display', 'none');
      inforole.prop('readonly', true);
    }
  }, 50);
}

function findApproverRoles() {
  var url =
    _spPageContextInfo.webAbsoluteUrl +
    "/_api/web/lists/getbytitle('LU-Approver Roles')/items?$select=Id,Title&$top=5000";
  restCall(url, setAllApproverRoles);
}
function setAllApproverRoles(results) {
  allApproverRoles = results;
}

function createApprovalRoute(approverJSONObject) {
  //var approver = approversResults;
  //var roles = approversRoles;
  if (approverJSONObject != '') {
    var objectstringval = JSON.parse(approverJSONObject);
    console.log('objectstringval', objectstringval);
    var approvername;
    var backupapprovername;
    var dummyapprover;
    var roleName = '';
    //var tdcolumnHTML  = $("#approvalRouteTable")
    var tdcolumnHTML = $('tr#lastrowofPreviousApproval td#approvalRouteTable');
    //$("<table class='customTable' style='display:table'><thead><tr><th>Role</th><th>Approver Name</th> <th>Backup Approver</th> </tr> </thead> <tbody id='Approverscontainer'></tbody></table>").append(tdcolumnHTML)
    var starttr = '<tr>';
    var endtr = '</tr>';
    var finalstring = '';
    for (var i = 0; i < objectstringval.length; i++) {
      approvername = '';
      backupapprovername = '';

      var rolename = objectstringval[i].role;
      approvername = objectstringval[i].approveremail;
      backupapprovername = objectstringval[i].backupemail;

      var flageapprover = 'false';
      if (approvername) {
        flageapprover = 'true';
      }

      var backupflag = 'false';
      if (backupapprovername) {
        backupflag = 'true';
      }

      if (rolename == '[Salesperson] + 1') {
        rolename = 'Sales Manager';
      }

      if (rolename == '[Salesperson] + 1 + 1') {
        rolename = "Sales Manager's Manager";
      }

      var approverinput;
      var backupapproverinput;
      if (
        objectstringval[i].role == '[Salesperson] + 1 + 1' ||
        objectstringval[i].role == '[Salesperson] + 1'
      ) {
        approverinput =
          "<input role= '" +
          rolename +
          "' id='approvername" +
          i +
          "' type ='text' title='" +
          approvername +
          "' value='" +
          approvername +
          "' flag='" +
          flageapprover +
          "' disabled />";
        backupapproverinput =
          "<input role= '" +
          rolename +
          "' id='backupapprover" +
          i +
          "' title = '" +
          backupapprovername +
          "' type ='text' value='" +
          backupapprovername +
          "' flag='" +
          backupflag +
          "' disabled />";
      } else {
        approverinput =
          "<input role= '" +
          rolename +
          "' id='approvername" +
          i +
          "' type ='text' title='" +
          approvername +
          "' value='" +
          approvername +
          "' flag='" +
          flageapprover +
          "' disabled />";
        backupapproverinput =
          "<input role= '" +
          rolename +
          "' id='backupapprover" +
          i +
          "' title = '" +
          backupapprovername +
          "' type ='text' value='" +
          backupapprovername +
          "' flag='" +
          backupflag +
          "' disabled />";
      }

      var tddesin =
        '<td>' +
        rolename +
        '</td>' +
        '<td>' +
        approverinput +
        '</td>' +
        '<td>' +
        backupapproverinput +
        '</td>';
      finalstring = finalstring + starttr + tddesin + endtr;
    }

    if (finalstring) {
      $('.customTable').css('display', 'table');
      $('tbody#Approverscontainer').append(finalstring);
    } else {
      $('#approverRouteheading').css('display', 'none');
      $('#sepratorApprovalRoute').css('display', 'none');
    }
  }
}

/* End Yogesh Code*/

if (inDesignMode == '1') {
  $(function () {
    //page loaded as EditPage (ie inDesignMode). Override the CSS and show the form sections
    $('table.ms-formtable > tbody > tr').show();
    $('table.ms-formtoolbar').show();
    $('table.ms-long').show();
  });
} else {
  //jQuery on DOM ready
  $(function () {
    inputTitle = $('#Title').closest('tr').find('input');
    //$(".loading").show();
    $('#overlay').fadeIn();
    rowPriorApproverName = $('#PriorApproverName').closest('tr');
    divPriorApproverName = rowPriorApproverName.find(
      'div.sp-peoplepicker-topLevel'
    );
    editorPriorApproverName = divPriorApproverName.children(
      'input.sp-peoplepicker-editorInput'
    );
    hiddenPriorApproverName = divPriorApproverName.children(
      'input[type="hidden"]'
    );

    rowAssignedTo = $('#AssignedTo').closest('tr');
    divAssignedTo = rowAssignedTo.find('div.sp-peoplepicker-topLevel');
    editorAssignedTo = divAssignedTo.children(
      'input.sp-peoplepicker-editorInput'
    );
    hiddenAssignedTo = divAssignedTo.children('input[type="hidden"]');

    // Back Approver Input initilize
    rowBackupApproverTo = $('#BackUPApprover').closest('tr');
    divBackupApproverTo = rowBackupApproverTo.find(
      'div.sp-peoplepicker-topLevel'
    );
    editorBackupApproverTo = divBackupApproverTo.children(
      'input.sp-peoplepicker-editorInput'
    );
    hiddenBackupApproverTo = divBackupApproverTo.children(
      'input[type="hidden"]'
    );

    rowNextapprover = $('#Next_x0020_Approver').closest('tr');
    divNextApprover = rowNextapprover.find('div.sp-peoplepicker-topLevel');
    editorNextApprover = divNextApprover.children(
      'input.sp-peoplepicker-editorInput'
    );
    hiddenNextApprover = divNextApprover.children('input[type="hidden"]');

    // CurrentTaskBackupApprover Input initilize   CurrentTaskBackupApprover
    rowCurrentTaskBackupApproverTo = $('#CurrentTaskBackupApprover').closest(
      'tr'
    );
    divCurrentTaskBackupApproverTo = rowCurrentTaskBackupApproverTo.find(
      'div.sp-peoplepicker-topLevel'
    );
    editorCurrentTaskBackupApproverTo = divCurrentTaskBackupApproverTo.children(
      'input.sp-peoplepicker-editorInput'
    );
    hiddenCurrentTaskBackupApproverTo = divCurrentTaskBackupApproverTo.children(
      'input[type="hidden"]'
    );

    attachments = $('#idAttachmentsRow')
      .closest('tr')
      .find('#idAttachmentsTable');
    SkipApproverLog = $('#SkipApproverLog').closest('tr').find('input');
    NumberOfApprovalSkip = $('#NumberOfApprovalSkip')
      .closest('tr')
      .find('input');
    PriorToApproverAction = $('#PriorApproverAction')
      .closest('tr')
      .find('input');
    rowCurrentAssignedtaskBackupApprover = $(
      '#CurrentTaskBackupApprover'
    ).closest('tr');
    ObjectString = $('#ObjectString').closest('tr').find('textarea');
    selectDecision = $('#Decision').closest('tr').find('select');
    selectStatus = $('#Status').closest('tr').find('select');
    selectRequestId = $('#RequestID').closest('tr').find('select');
    textareaComments = $('#Comments').closest('tr').find('textarea');
    CommentstoNextApprover = $('#CommentstoNextApprover')
      .closest('tr')
      .find('textarea');
    rowCompletedBy = $('#CompletedBy').closest('tr');
    divCompletedBy = rowCompletedBy.find('div.sp-peoplepicker-topLevel');
    editorCompletedBy = divCompletedBy.children(
      'input.sp-peoplepicker-editorInput'
    );
    hiddenCompletedBy = divCompletedBy.children('input[type="hidden"]');
    selectTrackerId = $('#TrackerID').closest('tr').find('select');
    selectStage = $('#Stage').closest('tr').find('select');
    inputRole = $('#Role').closest('tr').find('input');
    inputWorkflowInstance = $('#WorkflowInstance').closest('tr').find('input');
    msFormToolbar = $('table.ms-formtoolbar');
    buttonSave = msFormToolbar.find('input[value="Save"]');
    buttonCancel = msFormToolbar.find('input[value="Cancel"]');
    createButton('Add Approver Before');
    buttonPrioToMeApprove = msFormToolbar.find(
      'input[value="Add Approver Before"]'
    );
    createButton('Reject');
    buttonReject = msFormToolbar.find('input[value="Reject"]');
    NextApproverRole = $('#NextApproverRole').closest('tr').find('input');
    createButton('Approve');
    buttonApprove = msFormToolbar.find('input[value="Approve"]');

    var productSelectTable = $('#productSelectTable');
    var producttable = $('#GeneratedApprovalTableProduct');
    $(productSelectTable).append(producttable);
    $('table#GeneratedApprovalTableProduct').css('display', 'block');

    $('#NextApproverRole').closest('tr').css('display', 'table-row');
    $('#Next_x0020_Approver').closest('tr').css('display', 'table-row');
    $('#NextApproverRole').closest('tr').find('input').prop('readonly', true);
    NextApproverRoleID = $('#NextApproverRoleID').closest('tr').find('input');
    OrignalapproverID = $('#OignalapproverID').closest('tr').find('input');
    PriorApprover = $('#PriorApprover').closest('tr').find('input');
    PriorApproverNameTo = $('#PriorApproverName').closest('tr');
    PriorApproverTo = PriorApproverNameTo.find('div.sp-peoplepicker-topLevel');
    editorPriorApproverTo = PriorApproverTo.children(
      'input.sp-peoplepicker-editorInput'
    );
    hiddenPriorApproverTo = PriorApproverTo.children('input[type="hidden"]');
    //$('<div id="AddAnotherApprover" style="font-size: 20px;font-weight: 400;margin-top:10px;margin-bottom:10px"> Add Another Approver</div>').insertBefore($('#PriorApprover').closest('tr'))
    $(
      '<div id="AddAnotherApprover"> <h2 class="mb-3">Add Another Approver</div></div>'
    ).insertBefore($('#PriorApprover').closest('tr'));
    $(
      '<tr id="NextApprover" style="display:table-row"><td colspan="2" style="padding-bottom:20px;"> <h2 class="mb-3" style="margin-top:20px;">Next Approver</h2><div class="prev-approval-container"><p class="p-text fw-bolder">Please confirm that the next approver is correct per the DOA </br> Please add comments to next approver if needed, for example "this is urgent" </p></div></td></tr>'
    ).insertBefore($('#CommentstoNextApprover').closest('tr'));
    counter = 0;
    msFormToolbar.css('margin-top', '40px');
    getCurrentUser();
    findApproverRoles();
    getOwners();
    checkForRejectButton();
    getOutOfOfficeApprover();
    buttonPrioToMeApprove.attr('disabled', true);
    if (PriorApprover.is(':checked') == true) {
      PriorApprover.attr('disabled', true);
    }

    window.addEventListener('load', (event) => {
      console.log('page is fully loaded');
      getNextApproverDetails();
      //$(".loading").hide();
      $('#overlay').fadeOut();
    });

    $("[id$='ClientPeoplePicker'][title='Next Approver']").on(
      'change',
      function () {
        checkforapproveButton();
      }
    );

    var checkForPeoplePicker = setInterval(function () {
      if (
        typeof SPClientPeoplePicker !== 'undefined' &&
        typeof currentUser !== 'undefined'
      ) {
        //console.log('inside checkForPeoplePicker');
        clearInterval(checkForPeoplePicker);
        checkAssignedTo();
        document.getElementsByClassName('ms-cui-tt-a')[0].click();

        spPeoplePickerNextaPPROVER =
          SPClientPeoplePicker.SPClientPeoplePickerDict[divNextApprover[0].id];
        PriorApproverNamespspPeoplePicker =
          SPClientPeoplePicker.SPClientPeoplePickerDict[
            divPriorApproverName[0].id
          ];
        backupspPeoplePicker =
          SPClientPeoplePicker.SPClientPeoplePickerDict[
            divBackupApproverTo[0].id
          ];
        PriorApproverNamespspPeoplePicker.OnUserResolvedClientScript =
          function () {
            if (PriorApproverNamespspPeoplePicker.HasResolvedUsers() == true) {
              var Priorapprover =
                PriorApproverNamespspPeoplePicker.GetAllUserInfo();
              if (Priorapprover.length > 0) {
                buttonPrioToMeApprove.attr('disabled', false);
              }
            } else {
              buttonPrioToMeApprove.attr('disabled', true);
            }
          };
      }
    }, 50);

    textareaComments.keyup(function () {
      checkForRejectButton();
    });

    PriorApprover.change(function () {
      var ItemiD = getUrlParameter('ID');
      var prioraprroverCheck = $(this).is(':checked');
      if (prioraprroverCheck == true) {
        OrignalapproverID.val(ItemiD);
        PriorApproverNameTo.show();
        buttonApprove.attr('disabled', true);
        buttonReject.attr('disabled', true);
        buttonPrioToMeApprove.attr('disabled', true);
        PriorToApproverAction.val('Create Task');
      } else {
        OrignalapproverID.val('');
        PriorToApproverAction.val('');
        buttonApprove.attr('disabled', false);
        buttonReject.attr('disabled', false);
        PriorApproverNameTo.hide();
        buttonPrioToMeApprove.attr('disabled', true);
        PriorApproverNamespspPeoplePicker =
          SPClientPeoplePicker.SPClientPeoplePickerDict[
            divPriorApproverName[0].id
          ];
        var prioapprover = PriorApproverNamespspPeoplePicker.GetAllUserInfo();
        prioapprover.forEach(function (i) {
          PriorApproverNamespspPeoplePicker.DeleteProcessedUser(
            prioapprover[i]
          );
        });
      }
    });

    // Validation for Double Quotes
    textareaComments
      .keypress(function (e) {
        // override keypress of " or '
        if (e.which == 13 || e.which == 34 || e.which == 39) {
          return false;
        }
      })

      .bind('paste', function (e) {
        // forbid paste
        e.preventDefault();
      })

      .change(function () {
        var value = $(this).val();
        //and then I use this value for my operations
      });

    CommentstoNextApprover.keypress(function (e) {
      // override keypress of " or '
      if (e.which == 13 || e.which == 34 || e.which == 39) {
        return false;
      }
    })

      .bind('paste', function (e) {
        // forbid paste
        e.preventDefault();
      })

      .change(function () {
        var value = $(this).val();
        //and then I use this value for my operations
      });

    //when Approve is clicked, update the Decision and run the onclick for the Save button
    $(buttonApprove).click(function () {
      if (
        PriorToApproverAction.val() == 'Create Task' &&
        PriorApprover.is(':checked') == false
      ) {
        PriorToApproverAction.val('Send Email');
      } else {
        PriorToApproverAction.val('');
      }

      if (NextApproverRole.val() == '') {
        getNextApproverRole();
      }
      if (spPeoplePickerNextaPPROVER.GetAllUserInfo().length == 0) {
        getNextApproverDetails();
      }
      selectDecision.val('Approved');
      selectStatus.val('Completed');
      var ApproverRoles = requestDetails.SecondApproverRoles;
      roles_Split = ApproverRoles.split(';');
      var numberOfApprovalComplete = roles_Split.indexOf(
        $("select[Title='Role'] option:selected").text()
      );
      if (NextApproverRole.val() != '') {
        NumberOfApprovalSkip.val(parseInt(numberOfApprovalComplete) + 1);
      } else {
        if (
          NextApproverRole.val() == '' &&
          roles_Split.length >= parseInt(numberOfApprovalComplete) + 1
        ) {
          NumberOfApprovalSkip.val(parseInt(roles_Split.length));
        }
      }
      buttonSave[0].onclick();
    });

    //when Reject is clicked, update the Decision and run the onclick for the Save button
    $(buttonReject).click(function () {
      selectDecision.val('Rejected');
      selectStatus.val('Completed');
      var ApproverRoles = requestDetails.SecondApproverRoles;
      roles_Split = ApproverRoles.split(';');
      var numberOfApprovalComplete = roles_Split.indexOf(
        $("select[Title='Role'] option:selected").text()
      );
      NumberOfApprovalSkip.val(parseInt(numberOfApprovalComplete) + 1);
      buttonSave[0].onclick();
    });

    $(buttonPrioToMeApprove).click(function () {
      selectDecision.val('Prior To Me');
      selectStatus.val('Pending');
      buttonSave[0].onclick();
    });
  });
}
