using UrnaBackend.Models;

namespace UrnaBackend.Services.Interfaces
{
    public interface IVoteService
    {
        public Task<List<CandidateDto>> GetVotes();
        public Task AddVote(int candidateId);
    }
}
