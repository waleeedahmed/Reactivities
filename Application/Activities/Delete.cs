using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
                public class Command : IRequest
                {
                    public Guid Id { get; set; }
                }
        
                public class Handler : IRequestHandler<Command>
                {
                    private readonly DataContext _dc;
                    public Handler(DataContext dc)
                    {
                        _dc = dc;
                    }
        
                    public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                    {
                        var activity = await _dc.Activities.FindAsync(request.Id);

                        if (activity == null)
                            throw new Exception("Could not find activity");

                        _dc.Remove(activity);
        
                        var success = await _dc.SaveChangesAsync() > 0;
        
                        if (success) return Unit.Value;
        
                        throw new Exception("problem saving changes");
                    }
                }
    }
}