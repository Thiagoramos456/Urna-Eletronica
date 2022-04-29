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
        public async Task<List<CandidateRegisterDto>> Get()
        {
            var candidates = await _candidatesService.GetCandidates();
            return candidates;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCandidate([FromBody] CandidateRegisterDto candidate)
        {
            await _candidatesService.AddCandidate(candidate);
            return Ok();
        }
    }
}