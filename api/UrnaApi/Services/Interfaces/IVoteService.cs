using UrnaBackend.Dtos;

namespace UrnaBackend.Services.Interfaces
{
    public interface IVoteService
    {
        public Task<List<CandidateDashboardDto>> GetVotes();
        public Task AddVote(int candidateId);
    }
}
