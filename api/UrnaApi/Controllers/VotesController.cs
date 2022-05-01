using Microsoft.AspNetCore.Mvc;
using UrnaBackend.Dtos;
using UrnaBackend.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UrnaBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VotesController : ControllerBase
    {
        private readonly IVoteService _voteService;

        public VotesController(IVoteService voteService)
        {
            _voteService = voteService;
        }

        [HttpGet]
        public async Task<List<CandidateDashboardDto>> Get()
        {
            var candidates = await _voteService.GetVotes();
            return candidates;
        }

        [HttpPost]
        public async Task Post([FromBody] int candidateId)
        {
            await _voteService.AddVote(candidateId);
        }
    }
}
