using Microsoft.AspNetCore.Mvc;
using UrnaBackend.Dtos;
using UrnaBackend.Services.Interfaces;
using UrnaEFCore;

namespace UrnaApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CandidatesController : ControllerBase
    {
        private readonly ILogger<CandidatesController> _logger;
        private readonly UrnaContext _dbContext;
        private readonly ICandidateService _candidatesService;

        public CandidatesController(ILogger<CandidatesController> logger, UrnaContext dbContext, ICandidateService candidatesService)
        {
            _logger = logger;
            _dbContext = dbContext;
            _candidatesService = candidatesService;
        }

        [HttpGet]
        public CandidateUrnDto Get(int electoralNumber)
        {
            var candidate = _candidatesService.GetCandidateByElectoralNumber(electoralNumber);
            return candidate;
        }

        [HttpDelete]
        public async Task Delete([FromBody] int candidateId)
        {
            await _candidatesService.DeleteCandidate(candidateId);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CandidateRegisterDto candidate)
        {
            await _candidatesService.AddCandidate(candidate);
            return Ok();
        }
    }
}