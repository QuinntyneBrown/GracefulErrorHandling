using GracefulErrorHandling.Api.Features;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Threading.Tasks;

namespace GracefulErrorHandling.Api.Controllers
{
    [ApiController]
    [Route("api/contacts")]
    public class ContactsController
    {
        private readonly IMediator _mediator;

        public ContactsController(IMediator mediator) => _mediator = mediator;

        [HttpPost(Name = "CreateContactRoute")]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(CreateContact.Response), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<CreateContact.Response>> Create([FromBody]CreateContact.Request request)
            => await _mediator.Send(request);

        [HttpPut(Name = "UpdateContactRoute")]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(UpdateContact.Response), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<UpdateContact.Response>> Update([FromBody]UpdateContact.Request request)
            => await _mediator.Send(request);

        [HttpDelete("{contactId}", Name = "RemoveContactRoute")]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task Remove([FromRoute]RemoveContact.Request request)
            => await _mediator.Send(request);

        [HttpGet("{contactId}", Name = "GetContactByIdRoute")]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(GetContactById.Response), (int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.NotFound)]
        public async Task<ActionResult<GetContactById.Response>> GetById([FromRoute]GetContactById.Request request)
        {
            var response = await _mediator.Send(request);

            if (response.Contact == null)
            {
                return new NotFoundObjectResult(request.ContactId);
            }

            return response;
        }

        [HttpGet("get/{pageSize}/{pageIndex}", Name = "GetContactsRoute")]
        [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
        [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(GetContacts.Response), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<GetContacts.Response>> Get([FromRoute]GetContacts.Request request)
            => await _mediator.Send(request);

        [HttpPost("upload"), DisableRequestSizeLimit]
        public async Task<ActionResult<UploadContactsImportFiles.Response>> Upload()
            => await _mediator.Send(new UploadContactsImportFiles.Request());
    }
}
