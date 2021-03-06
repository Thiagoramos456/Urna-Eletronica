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
        public IActionResult Get(int electoralNumber)
        {
            var candidate = _candidatesService.GetCandidateByElectoralNumber(electoralNumber);

            return candidate != null ? Ok(candidate) : NotFound("Candidato n?o encontrado");
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] int candidateId)
        {
            var beenDeleted = await _candidatesService.DeleteCandidate(candidateId);

            return beenDeleted ? Ok() : NotFound("O candidato com o ID enviado n?o foi encontrado");
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CandidateRegisterDto candidate)
        {
            if (candidate.ElectoralNumber < 10 || candidate.ElectoralNumber > 99)
            {
                return BadRequest("A legenda do candidato deve haver dois digitos");
            }

            var candidateAlreadyExists = await _candidatesService.AddCandidate(candidate);

            return candidateAlreadyExists == true ? Unauthorized("O candidato com esta legenda j? existe") : Ok();
        }
    }
}