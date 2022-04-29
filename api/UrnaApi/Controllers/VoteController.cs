using Microsoft.AspNetCore.Mvc;
using UrnaBackend.Models;
using UrnaBackend.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UrnaBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoteController : ControllerBase
    {
        private readonly IVoteService _voteService;

        public VoteController(IVoteService voteService)
        {
            _voteService = voteService;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // POST api/<VoteController>
        [HttpPost]
        public async Task Post([FromBody] int candidateId)
        {
            await _voteService.AddVote(candidateId);
        }
    }
}
